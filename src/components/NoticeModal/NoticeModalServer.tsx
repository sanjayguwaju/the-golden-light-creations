import { getNotices } from "@/utilities/getNotices";
import { NoticeModal } from "./index";

export const NoticeModalServer = async () => {
  const notices = await getNotices();

  if (!notices || notices.length === 0) return null;

  return <NoticeModal notices={notices} />;
};
