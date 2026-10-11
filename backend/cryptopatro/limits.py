"""Single-worker capacity controls, separate from verified portfolio identity."""

import ipaddress
import math
import time
from collections import deque
from dataclasses import dataclass
from threading import Lock

from fastapi import HTTPException, Request

from .settings import Settings


@dataclass(frozen=True)
class Rule:
    key: str
    limit: int
    seconds: int = 60
    capacity: bool = False


class RateLimiter:
    """Atomically admit all windows or none; never charge rejected requests."""

    def __init__(self):
        self.windows: dict[str, deque[float]] = {}
        self._lock = Lock()

    def check(self, rules: list[Rule]):
        with self._lock:
            current = time.monotonic()
            requested_keys = {rule.key for rule in rules}
            missing = sum(key not in self.windows for key in requested_keys)
            if len(self.windows) + missing > 10000:
                # All HTTP windows are at most an hour. Never evict an active quota.
                self.windows = {
                    key: value for key, value in self.windows.items() if value and current - value[-1] < 3600
                }
                missing = sum(key not in self.windows for key in requested_keys)
                if len(self.windows) + missing > 10000:
                    raise HTTPException(
                        429,
                        "Service capacity reached. Please try again shortly.",
                        headers={"Retry-After": "60"},
                    )
            pending = []
            for rule in rules:
                window = self.windows.get(rule.key, deque())
                while window and current - window[0] >= rule.seconds:
                    window.popleft()
                if len(window) >= rule.limit:
                    detail = (
                        "Service capacity reached. Please try again shortly."
                        if rule.capacity
                        else "Too many requests. Please try again shortly."
                    )
                    retry = max(1, math.ceil(window[0] + rule.seconds - current))
                    raise HTTPException(429, detail, headers={"Retry-After": str(retry)})
                pending.append((rule.key, window))
            for key, window in pending:
                window.append(current)
                self.windows[key] = window


def public_client_ip(request: Request, settings: Settings) -> str | None:
    """A public network address is a quota key, never proof of a unique human."""
    if settings.rate_limit_mode == "shared_proxy":
        return None
    peer = request.client.host if request.client else ""
    if settings.trust_proxy_headers:
        # The isolated frontend must replace this with one verified address.
        # A missing or malformed proxy value does not fall back to a shared proxy IP.
        peer = request.headers.get("X-Forwarded-For", "")
    try:
        address = ipaddress.ip_address(peer)
        if isinstance(address, ipaddress.IPv6Address) and address.scope_id:
            return None
        if isinstance(address, ipaddress.IPv6Address) and address.ipv4_mapped:
            address = address.ipv4_mapped
        return str(address) if address.is_global and not address.is_multicast else None
    except ValueError:
        return None
