import axios from "axios";

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  getUnmatchedJobs() {
    return this.client.get("/jobs");
  }

  getMatchedJobs(rankType) {
    const path = rankType ? "yes" : "no";
    return this.client.get(`/matched/${path}`);
  }

  login({ email, password }) {
    return this.client.post("/auth/login", { email, password });
  }

  register({ email, password }) {
    return this.client.post("/auth/register", { email, password });
  }

  setHeaders(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  resetHeaders() {
    delete axios.defaults.headers.common["Authorization"];
  }
}
export default new HttpClient(process.env.VUE_APP_API_URL);
