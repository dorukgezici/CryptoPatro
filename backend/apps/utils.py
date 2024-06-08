from concurrent.futures import ThreadPoolExecutor
import asyncio


def sync_executor(func):
    def wrapper(*args, **kwargs):
        return ThreadPoolExecutor(1).submit(asyncio.run, func(*args, **kwargs)).result()

    return wrapper
