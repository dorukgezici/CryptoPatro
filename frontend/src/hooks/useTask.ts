import { $portfolioAssets } from "@/store/portfolio";
import { $taskId, $taskStatus } from "@/store/tasks";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

export default function useTask() {
  const { data: taskStatus } = useStore($taskStatus);

  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {
    switch (taskStatus) {
      case "SUCCESS":
        $taskId.set("");
        $portfolioAssets.invalidate();
        break;
      case "PENDING":
      case "RECEIVED":
      case "STARTED":
        setTimeout(() => {
          $taskStatus.invalidate();
          setCheckCount(checkCount + 1);
        }, 1000);
        break;
      default:
        // TODO: handle error case and limit checks
        $taskId.set("");
    }
  }, [taskStatus, checkCount]);

  return taskStatus;
}
