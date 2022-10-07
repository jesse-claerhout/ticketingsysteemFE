import interceptors from "./interceptors";

const countNewNotifications = () => {
  return interceptors.get("/account/inbox/unseen-count");
};

const getInbox = () => {
  return interceptors.get("/account/inbox");
};

const deleteNotification = (id: number) => {
  return interceptors.delete(`account/inbox/${id}`);
};

const clearInbox = () => {
  return interceptors.delete("account/inbox");
};

const AccountService = {
  countNewNotifications,
  getInbox,
  deleteNotification,
  clearInbox,
};
export default AccountService;
