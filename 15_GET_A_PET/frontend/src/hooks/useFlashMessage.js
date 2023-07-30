import bus from "../utils/bus";

export default function useFlashMessage() {
  function setFlashMessage(message, type) {
    bus.emit("flash", {
      message,
      type,
    });
  }

  return { setFlashMessage };
}
