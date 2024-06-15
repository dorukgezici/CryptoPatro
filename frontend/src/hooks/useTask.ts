import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { $portfolioAssets } from "@/store/portfolio";
import { $taskId, $taskStatus } from "@/store/tasks";

export default function useTask() {
  const taskId = useStore($taskId);
  const { data: taskStatus } = useStore($taskStatus);

  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {
    switch (taskStatus) {
      case "SUCCESS":
        $taskId.set("");
        $portfolioAssets.revalidate();
        break;
      case "PENDING":
      case "RECEIVED":
      case "STARTED":
        setTimeout(() => {
          $taskStatus.revalidate();
          setCheckCount(checkCount + 1);
        }, 1000);
        break;
      default:
        // TODO: handle error case and retry limit
        $taskId.set("");
    }
  }, [taskStatus, checkCount]);

  return { taskId, taskStatus };
}
