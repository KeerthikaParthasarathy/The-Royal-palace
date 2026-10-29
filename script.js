document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  const motion = gsap.matchMedia();

  motion.add("(prefers-reduced-motion: no-preference)", () => {
    const hero = document.querySelector(".hero");
    const video = document.querySelector(".hero-video");
    const content = document.querySelector(".hero-content");
    const scrollCue = document.querySelector(".scroll-cue");

    if (hero && video && content) {
      const transition = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=85%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      transition
        .to(video, { scale: 1.18, opacity: 0.42, ease: "none" }, 0)
        .to(content, { yPercent: -24, scale: 0.94, opacity: 0, ease: "none" }, 0)
        .to(scrollCue, { opacity: 0, ease: "none" }, 0);
    }

    const heritageContent = document.querySelector(".heritage-content");
    if (heritageContent) {
      gsap.fromTo(heritageContent,
        { y: 54, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power2.out", scrollTrigger: { trigger: heritageContent, start: "top 78%", once: true } }
      );
    }

    const heading = document.querySelector(".experience-heading");
    if (heading) {
      gsap.fromTo(heading,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: heading, start: "top 84%", once: true } }
      );
    }

    gsap.utils.toArray(".image-left, .image-right").forEach((image) => {
      const fromX = image.classList.contains("image-left") ? -90 : 90;
      gsap.fromTo(image,
        { x: fromX, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.15, ease: "power2.out", scrollTrigger: { trigger: image, start: "top 82%", once: true } }
      );
    });

    gsap.utils.toArray(".copy-left, .copy-right").forEach((copy) => {
      const fromX = copy.classList.contains("copy-left") ? -70 : 70;
      gsap.fromTo(copy,
        { x: fromX, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: { trigger: copy, start: "top 82%", once: true } }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.set([video, content, scrollCue, heritageContent, heading, ".image-left", ".image-right", ".copy-left", ".copy-right"], { clearProps: "all" });
    };
  });
});
