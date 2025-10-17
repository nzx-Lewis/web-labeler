import { Label } from "../options/types";
import classes from "./style.module.scss";

export class EnvBadge {
  public constructor(
    private element: HTMLDivElement | null = null,
    private hoverListener: ((event: MouseEvent) => void) | null = null,
  ) {}

  public update(label: Label | null) {
    this.remove();
    if (label) {
      this.render(label);
    }
  }

  private render(label: Label) {
    this.element = document.createElement("div");
    this.element.className = classes.label;
    this.element.classList.add(classes?.[label.shape]);
    this.element.classList.add(classes?.[label.position]);
    this.element.innerHTML =
      label.shape === "frame" ? "" : label.name.replace(/\r\n|\r|\n/g, "<br>");

    this.element.style.setProperty("--label-text-color", label.textColor);
    this.element.style.setProperty("--label-opacity", String(label.opacity));
    this.element.style.setProperty("--label-background-color", label.bgColor);
    if (label?.hoveredOpacity !== undefined) {
      this.element.style.setProperty(
        "--label-hovered-opacity",
        String(label.hoveredOpacity),
      );
    }
    if (label.fontSize) {
      this.element.style.setProperty(
        "--label-font-size",
        String(label.fontSize) + "px",
      );
    }
    if (label?.scale) {
      this.element.style.setProperty("--label-scale", String(label.scale));
    }
    if (label?.border) {
      this.element.style.setProperty(
        "--label-border-style",
        String(label.border),
      );
    }
    if (label?.borderColor) {
      this.element.style.setProperty(
        "--label-border-color",
        String(label.borderColor),
      );
    }
    if (label?.borderWidth !== undefined) {
      this.element.style.setProperty(
        "--label-border-width",
        String(label.borderWidth) + "px",
      );
    }

    document.body.appendChild(this.element);

    if (label.hoveredOpacity !== undefined) {
      this.hoverListener = this.hoverHandler;
      document.addEventListener("mousemove", this.hoverListener);
    }

    const fadeAfter = Number(label.fadeAfter);
    if (!isNaN(fadeAfter) && fadeAfter > 0) {
      const showOnFocus = () => {
        console.log("window focused, showing badge", this.element);
        if (this.element) {
          this.element.style.transition = "opacity 0.5s";
          this.element.style.opacity = "1";
          clearTimeout((this as any)._fadeTimeout);
          (this as any)._fadeTimeout = setTimeout(() => {
            console.log("fading out after focus", this.element);
            if (this.element) this.element.style.opacity = "0";
          }, fadeAfter * 1000);
        }
      };
      window.addEventListener("focus", showOnFocus);

      // Hide after fadeAfter seconds on initial render
      this.element.style.transition = "opacity 0.5s";
      (this as any)._fadeTimeout = setTimeout(() => {
        console.log("fading out initially", this.element);
        if (this.element) this.element.style.opacity = "0";
      }, fadeAfter * 1000);

      // Store cleanup for remove()
      (this as any)._focusListener = showOnFocus;
    }

    console.log("fade after", fadeAfter);


  }

  private remove() {
    if (this.hoverListener) {
      document.removeEventListener("mousemove", this.hoverListener);
    }
    if (this.element) {
      document.body.removeChild(this.element);
      this.element = null;
    }
    if ((this as any)._fadeTimeout) {
      clearTimeout((this as any)._fadeTimeout);
      (this as any)._fadeTimeout = undefined;
    }
    if ((this as any)._focusListener) {
      window.removeEventListener("focus", (this as any)._focusListener);
      (this as any)._focusListener = undefined;
    }
  }

  private hoverHandler = (event: MouseEvent) => {
    if (!this.element) {
      return;
    }
    const { left, top, width, height } = this.element.getBoundingClientRect();

    const isHovering =
      event.clientX >= left &&
      event.clientX <= left + width &&
      event.clientY >= top &&
      event.clientY <= top + height;

    if (isHovering) {
      this.element.classList.add(classes.hovered);
    } else {
      this.element.classList.remove(classes.hovered);
    }
  };
}
