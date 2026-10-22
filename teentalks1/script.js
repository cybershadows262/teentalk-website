const welcomeScreen = document.querySelector("#welcome-screen");
const chatScreen = document.querySelector("#chat-screen");
const ageSelect = document.querySelector("#age-select");
const topicGrid = document.querySelector("#topic-grid");
const startButton = document.querySelector("#start-button");
const selectionError = document.querySelector("#selection-error");
const chatTopicTitle = document.querySelector("#chat-topic-title");
const messages = document.querySelector("#chat-messages");
const chatForm = document.querySelector("#chat-form");
const messageInput = document.querySelector("#message-input");
const changeTopicButton = document.querySelector("#change-topic");

let selectedTopic = "";
let selectedAge = "";

topicGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".topic-card");
  if (!card) return;
  document.querySelectorAll(".topic-card").forEach((item) => item.classList.remove("selected"));
  card.classList.add("selected");
  selectedTopic = card.dataset.topic;
  selectionError.textContent = "";
});

startButton.addEventListener("click", () => {
  selectedAge = ageSelect.value;
  if (!selectedAge || !selectedTopic) {
    selectionError.textContent = "Please choose your age group and a topic first.";
    return;
  }
  welcomeScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
  chatTopicTitle.textContent = selectedTopic;
  messages.innerHTML = "";
  addMessage(`Hi! I'm TeenTalk. We can talk about ${selectedTopic.toLowerCase()}. You don't have to share anything you're not comfortable sharing. What's been on your mind?`, "bot");
  messageInput.focus();
});

changeTopicButton.addEventListener("click", () => {
  chatScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
});

document.querySelectorAll(".quick-replies button").forEach((button) => {
  button.addEventListener("click", () => sendMessage(button.dataset.message));
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(messageInput.value);
});

function sendMessage(rawMessage) {
  const message = rawMessage.trim();
  if (!message) return;
  addMessage(message, "user");
  messageInput.value = "";
  window.setTimeout(() => {
    addMessage(getReply(message), "bot");
  }, 250);
}

function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `message ${sender}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function getReply(rawMessage) {
  const message = rawMessage.toLowerCase();

  // This is a simple keyword-based demo chatbot, not an AI therapist.
  if (containsAny(message, ["exam", "marks", "study", "school", "homework", "grades", "pressure"])) {
    return "Academic pressure can feel like a lot. Try choosing one small task to focus on first, then take a short break. What part feels most difficult right now?";
  }
  if (containsAny(message, ["friend", "relationship", "family", "parent", "fight", "lonely", "alone"])) {
    return "Friendships and family situations can be complicated. It may help to think about what you want the other person to understand. What happened, if you're comfortable sharing?";
  }
  if (containsAny(message, ["stress", "sad", "angry", "anxious", "worried", "overwhelmed", "tired", "cry"])) {
    return "That sounds like a tough feeling to carry. Take a slow breath, and remember you don't have to solve everything at once. What feels like the biggest thing weighing on you?";
  }
  if (containsAny(message, ["confidence", "self-doubt", "useless", "failure", "bad at", "not good enough"])) {
    return "It's easy to be hard on yourself when things aren't going well. One difficult moment doesn't define you. Can you think of one small thing you've handled well recently?";
  }
  if (containsAny(message, ["help", "what should i do", "advice", "next step", "start"])) {
    return "A small first step is often easier than solving everything at once. You could write down what's bothering you or talk to someone you trust. Which option feels more manageable?";
  }
  if (containsAny(message, ["hello", "hi", "hey"])) {
    return "Hey! I'm glad you started the conversation. What's been on your mind today?";
  }
  if (containsAny(message, ["thank", "thanks"])) {
    return "You're welcome. I'm glad you shared that with me. Is there anything else you'd like to talk through?";
  }
  if (containsAny(message, ["don't know", "do not know", "idk", "not sure"])) {
    return "That's okay—you don't need to have the perfect words. You could start with how your day has been, or just name the feeling you're having.";
  }
  return "Thanks for telling me. I may not have the perfect answer, but we can take it one step at a time. What do you think is the hardest part of this for you?";
}

function containsAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}
