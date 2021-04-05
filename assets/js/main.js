import "../scss/style.scss";

const container = document.querySelector(".layout");

//slow navigation menu
function initSlowScrollMenu() {
  container.querySelectorAll(".menu__link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const blockID = link.getAttribute("href").substring(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

//burger menu
function initBurgerMenu() {
  const burger = container.querySelector(".burger");
  const burgerMenu = container.querySelector(".burger-menu");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    burgerMenu.classList.toggle("active");
  });
}

class ProgressBar {
  constructor({ progressList, duration }) {
    this.progressList = progressList;
    this.duration = duration;
  }

  proccessItem(_item) {}

  #initProgress() {
    Array.from(this.progressList.children).forEach(this.proccessItem);
  }

  #initScrollCheck = () => {
    if (
      window.pageYOffset > this.progressList.clientHeight ||
      window.pageYOffset + document.documentElement.clientHeight > this.progressList.clientHeight
    ) {
      this.#initProgress();
      window.removeEventListener("scroll", this.#initScrollCheck);
    }
  };

  start() {
    window.addEventListener("scroll", this.#initScrollCheck);
  }
}

class ProgressSkillBar extends ProgressBar {
  constructor(config) {
    super(config);
  }

  proccessItem = (skillItem) => {
    const progress = skillItem.querySelector(".skills__progress");
    const number = skillItem.querySelector(".skills__number");
    const circle = skillItem.querySelector(".skills__circle");

    let intervalId = null;
    let percent = 0;
    let max = Number(progress.innerHTML.slice(0, -1));

    intervalId = setInterval(() => {
      if (percent > max) {
        clearInterval(intervalId);
        number.innerHTML = "";
        circle.style = "display: none";
      } else {
        progress.value = percent;
        number.innerHTML = percent + "%";
        circle.style.left = percent + "%";
        percent++;
      }
    }, this.duration);
  };
}

class ProgressLangBar extends ProgressBar {
  constructor(config) {
    super(config);
  }

  proccessItem = (circleItem) => {
    const circleDiagram = circleItem.querySelector(".lang__circle");
    const circlePercent = circleItem.querySelector(".lang__diagram-percent");
    const circlePercentValue = circleItem.querySelector(".lang__diagram-percent--value");
    const circleLength = circleDiagram.getAttribute("r") * 2 * 3.14;
    const operationLength = Math.round(
      circleLength - (circleLength / 100) * Number(circlePercentValue.innerHTML.slice(0, -1)),
    );

    let circleLengthCounter = circleLength;
    let percentCounter = 0;
    let intervalId = null;

    intervalId = setInterval(() => {
      if (circleLengthCounter < operationLength) clearInterval(intervalId);
      else {
        circlePercent.innerHTML = (percentCounter / 2.2).toFixed(0) + "%";
        circleDiagram.style.strokeDashoffset = circleLengthCounter;
        percentCounter++;
        circleLengthCounter--;
      }
    }, this.duration);
  };
}

initSlowScrollMenu();
initBurgerMenu();
new ProgressSkillBar({ progressList: container.querySelector(".skills__list--hard"), duration: 40 }).start();
new ProgressSkillBar({ progressList: container.querySelector(".skills__list--soft"), duration: 40 }).start();
new ProgressLangBar({ progressList: container.querySelector(".lang__list"), duration: 16 }).start();
