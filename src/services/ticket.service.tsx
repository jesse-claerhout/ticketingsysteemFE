import { EditTicketHandymanFields } from "../components/EditTicket/editTicketDialogHandyman";
import { EditTicketUserFields } from "../components/EditTicket/editTicketDialogUser";
import interceptors from "./interceptors";

const getMyTickets = (
  stateParams?: string[],
  buildingParams?: string[],
  sortParams?: string,
  searchParam?: string
) => {
  return interceptors.get("/tickets/my-tickets", {
    params: {
      states: stateParams,
      buildings: buildingParams,
      sort: sortParams,
      search: searchParam,
    },
    paramsSerializer: (params) => {
      let result = "";
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && key !== "sort" && key !== "search") {
          result += `${key}=${encodeURI(params[key].join("|"))}&`;
        }
        if (params[key] !== undefined && key === "sort") {
          result += `${key}=${params[key]}&`;
        }
        if (params[key] !== undefined && key === "search") {
          result += `${key}=${params[key]}&`;
        }
      });
      return result.substring(0, result.length - 1);
    },
  });
};

const getAllTickets = (
  stateParams?: string[],
  buildingParams?: string[],
  sortParams?: string,
  searchParam?: string
) => {
  return interceptors.get("/tickets", {
    params: {
      states: stateParams,
      buildings: buildingParams,
      sort: sortParams,
      search: searchParam,
    },
    paramsSerializer: (params) => {
      let result = "";
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && key !== "sort" && key !== "search") {
          result += `${key}=${encodeURI(params[key].join("|"))}&`;
        }
        if (params[key] !== undefined && key === "sort") {
          result += `${key}=${params[key]}&`;
        }
        if (params[key] !== undefined && key === "search") {
          result += `${key}=${params[key]}&`;
        }
      });
      return result.substring(0, result.length - 1);
    },
  });
};

const getTicketDetail = (id: String | undefined) => {
  return interceptors.get(`/tickets/${id}`);
};

const postFollowTicket = (id: String | undefined) => {
  return interceptors.post(`/tickets/${id}/follow`);
};

const postUnfollowTicket = (id: String | undefined) => {
  return interceptors.post(`/tickets/${id}/unfollow`);
};

const postTicket = (data: any) => {
  return interceptors.post("/tickets", data);
};

const getBuildings = () => {
  return interceptors.get("/locations/buildings");
};

const getPriorities = () => {
  return interceptors.get("/tickets/priorities");
};

const getStates = () => {
  return interceptors.get("/tickets/states");
};

const putTicketHandyman = (id: number, data: EditTicketHandymanFields) => {
  return interceptors.put(`/tickets/${id}/edit-handyman`, data);
};

const putTicketUser = (id: number, data: EditTicketUserFields) => {
  return interceptors.put(`/tickets/${id}/edit-user`, data);
};

const getOpenTickets = (
  buildingsParams?: string[],
  sortParams?: string,
  searchParam?: string
) => {
  return interceptors.get("/tickets/open-tickets", {
    params: {
      buildings: buildingsParams,
      sort: sortParams,
      search: searchParam,
    },
    paramsSerializer: (params) => {
      let result = "";
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && key !== "sort" && key !== "search") {
          result += `${key}=${encodeURI(params[key].join("|"))}&`;
        }
        if (params[key] !== undefined && key === "sort") {
          result += `${key}=${params[key]}&`;
        }
        if (params[key] !== undefined && key === "search") {
          result += `${key}=${params[key]}&`;
        }
      });
      return result.substring(0, result.length - 1);
    },
  });
};

const handymanSubscribe = (id: string | undefined) => {
  return interceptors.post(`/tickets/${id}/subscribe`);
};

const getPreSignedUrlToUpload = () => {
  return interceptors.get("/images/generate-upload-url");
};

const deleteTicket = (id: number | undefined) => {
  return interceptors.delete(`/tickets/${id}`);
};

const getHistory = (id: string | undefined) => {
  return interceptors.get(`/tickets/${id}/history`);
};

const TicketService = {
  getMyTickets,
  getAllTickets,
  getTicketDetail,
  getPriorities,
  postFollowTicket,
  postUnfollowTicket,
  postTicket,
  getBuildings,
  getStates,
  putTicketHandyman,
  putTicketUser,
  getOpenTickets,
  handymanSubscribe,
  getPreSignedUrlToUpload,
  deleteTicket,
  getHistory,
};
export default TicketService;
