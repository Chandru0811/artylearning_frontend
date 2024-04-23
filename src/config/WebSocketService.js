import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

class WebSocketService {
  constructor() {
    // this.socket = new SockJS("http://13.213.208.92:7080/ecssms/ws");
    this.socket = new SockJS("https://hrisasia.com/ecssms/ws");
    // this.socket = new SockJS("https://artylearning.com/artylearning/ws");
    this.stompClient = Stomp.over(this.socket);
    // this.stompClient.debug = false; // Disable debug logging
    this.connected = false;
    this.connect(() => {
      this.connected = true;
    });
  }

  connect(callback) {
    this.stompClient.connect({}, () => {
      console.log("Connected to WebSocket");
      if (callback) {
        callback();
      }
    });
  }

  subscribeToAttendanceUpdates(callback) {
    if (!this.connected) {
      console.error("STOMP connection not established");
      return;
    }
    this.stompClient.subscribe("/topic/attendance", (response) => {
      console.log(response);
      callback(JSON.parse(response.body));
    });
  }

  markAttendance(message) {
    if (!this.connected) {
      console.error("STOMP connection not established");
      return;
    }
    this.stompClient.send("/app/markAttendance", {}, JSON.stringify(message));
  }
}

export default new WebSocketService();
