const navbarTransition = () => {
  const navbar = document.querySelector("#navbar");
  if (window.scrollY < 100) {
    navbar.style.boxShadow = "none";
  } else if (window.scrollY >= 100) {
    navbar.style.boxShadow = "0 4px 6px -2px rgba(0, 0, 0, 0.25)";
  }
};

const showMenu = () => {
  const menu = document.querySelector(".links");

  if (menu.className === "links") {
    menu.className += " responsive";
  } else {
    menu.className = "links";
  }
};

window.onscroll = navbarTransition;
