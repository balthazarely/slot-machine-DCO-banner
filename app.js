// Initialize Spinner Divs
function createDivLoop(targetDivID, image1, image2, image3, image4, image5, image6, image7) {
	let toAdd = document.createDocumentFragment();
	for (let k = 0; k < 20; k++) {
		for (let i = 0; i <= 6; i++) {
			let image = document.createElement("img");

			if (i === 0) {
				image.setAttribute("src", image1);
			} else if (i === 1) {
				image.setAttribute("src", image2);
			} else if (i === 2) {
				image.setAttribute("src", image3);
			} else if (i === 3) {
				image.setAttribute("src", image4);
			} else if (i === 4) {
				image.setAttribute("src", image5);
			} else if (i === 5) {
				image.setAttribute("src", image6);
			} else if (i === 6) {
				image.setAttribute("src", image7);
			}

			let elem = document.createElement("div");
			image.setAttribute("height", "50");
			image.setAttribute("width", "50");

			// elem.style.borderTop = "1px solid red"; // adds the lines
			elem.appendChild(image);
			elem.className = "Div-" + [i];
			toAdd.appendChild(elem);
		}
	}
	document.getElementById(targetDivID).appendChild(toAdd);
}

// Start Animation
let start = new TimelineMax({});
start.from("#slot-main-wrapper", 1, { scale: 0, rotation: 45, delay: .3, ease: Back.easeOut.config(1.7) })
	.staggerFrom(".top-elements, #sling-logo", 1, { scale: 0, ease: Back.easeOut.config(2) }, 0.2, "-=1")
	.from("#background", 1, { opacity: 0, ease: Back.easeInOut.config(1.7) }, "-=1.35");

// Logo Animation
let logoBlink = new TimelineMax({ repeat: -1, repeatDelay: 5, delay: 1 });
logoBlink.staggerTo(".icon", 0.3, { scale: 0, transformOrigin: "50% 50%" }, 0.1, "+=0.5")
	.staggerTo(".icon", 0.3, { scale: 1, ease: Back.easeOut.config(3.5), transformOrigin: "50% 50%" }, 0.1, "-=0.5");

// Blink Lights Animation
let lights = new TimelineMax({ repeat: -1 });
lights.staggerTo(".lights", 0.1, { opacity: 1, delay: 0.75 }, 0.1)
	.to(".lights", 0.4, { opacity: 0 })
	.to(".lights, #header-blink", 0.2, { opacity: 1 }, "+=.2")
	.to(".lights, #header-blink", 0.2, { opacity: 0 }, "+=.5")
	.staggerTo(".lights", 0.1, { opacity: 1 }, -0.1)
	.to(".lights, #header-blink", 0.4, { opacity: 0 })
	.to(".lights, #header-blink", 0.2, { opacity: 1 }, "+=.2")
	.to(".lights, #header-blink", 0.2, { opacity: 0 }, "+=.5");

// Create Divs
createDivLoop("scroller-1", "./logos/MTV.jpg", "./logos/NBC.jpg", "./logos/VH1.jpg", "./logos/ABC.jpg", "./logos/Disney.jpg", "./logos/ESPN.jpg", "./logos/History.jpg");
createDivLoop("scroller-2", "./logos/ABC.jpg", "./logos/History.jpg", "./logos/Disney.jpg", "./logos/NBC.jpg", "./logos/VH1.jpg", "./logos/MTV.jpg", "./logos/ESPN.jpg");
createDivLoop("scroller-3", "./logos/ESPN.jpg", "./logos/VH1.jpg", "./logos/ABC.jpg", "./logos/MTV.jpg", "./logos/Disney.jpg", "./logos/History.jpg", "./logos/NBC.jpg");

// Event Listener / Calling sequence function
document.getElementById("container").addEventListener("click", function () {
	if (!animationRunning) {
		animate();
	}
});
let animationRunning = false;



// Animation Sequence
function animate() {
	animationRunning = true;
	let close = new TimelineMax({});
	close.to("#slot-wrapper, #light-container, #light-container-2, #spinner-container", 1, { scale: 1.2, ease: Back.easeOut.config(1.7) })
		.to("#header", .5, { scale: 0 }, "-=0.5")
		.to("#sling-logo", .5, { scale: 0 }, "-=0.35");

	// Remove button
	(function buttonDisapear() {
		let btn = document.getElementById("play-btn");
		btn.style.transform = "scale(0)";
	})();

	// Make first light sequence disapear
	document.getElementById('light-container').style.display = "none";

	// Get random digit to choose sequence
	let digit;
	(function randomDigit() {
		digit = Math.floor(Math.random() * 3);
		console.log(digit, "< animation seq.");
		return digit;
	})();

	// Scroller Animations
	let tl = new TimelineMax({});
	if (digit === 0) {
		tl.to("#scroller-1", 2, { y: -800, delay: 0.2, ease: "power4.inOut" })
			.to("#scroller-2", 2, { y: -1048, ease: "power4.inOut" }, "-=1.7")
			.to("#scroller-3", 2, { y: -1049, ease: "power4.inOut" }, "-=1.7")
			.to("#header-winner", .5, { scale: 1, ease: "elastic.out(1, 0.4)" }, "-=.1");
	} else if (digit === 1) {
		tl.to("#scroller-1", 2, { y: -1000, delay: 0.2, ease: "power4.inOut" })
			.to("#scroller-2", 2, { y: -1248, ease: "power4.inOut" }, "-=1.7")
			.to("#scroller-3", 2, { y: -1249, ease: "power4.inOut" }, "-=1.7")
			.to("#header-winner", .5, { scale: 1, ease: "elastic.out(1, 0.4)" }, "-=.1");
	} else if (digit === 2) {
		tl.to("#scroller-1", 2, { y: -1300, delay: 0.2, ease: "power4.inOut" })
			.to("#scroller-2", 2, { y: -1498, ease: "power4.inOut" }, "-=1.7")
			.to("#scroller-3", 2, { y: -1347, ease: "power4.inOut" }, "-=1.7")
			.to("#header-winner", .5, { scale: 1, ease: "elastic.out(1, 0.4)" }, "-=.1");
	}
	tl.to("#scroller-1, #scroller-2, #scroller-3", 2, { y: 1000, ease: "power4.inOut" }, "+=0.65");

	// Repreating Button Shimmer/
	let shinnyLine = new TimelineMax({ repeat: -1 });
	shinnyLine.to("#final-btn-shinny", 2, { x: 250, ease: Power2.easeInOut }, "-=0.5")
		.to("#final-btn-shinny", 4, {});

	// Animation After Play Button Clicked
	let lightsSpinning = new TimelineMax({});
	lightsSpinning.staggerTo(".lights-2", 0.1, { opacity: 1 }, 0.05)
		.staggerTo(".lights-2", 0.1, { opacity: 0 }, 0.05, "-=0.10")
		.staggerTo(".lights-2", 0.1, { opacity: 1 }, 0.05)
		.staggerTo(".lights-2", 0.1, { opacity: 0 }, 0.05, "-=0.10")
		// Flashing Lights
		.to(".lights-2", 0.15, { opacity: 1 })
		.to(".lights-2", 0.15, { opacity: 0 })
		.to(".lights-2", 0.15, { opacity: 1 })
		.to(".lights-2", 0.15, { opacity: 0 })
		.to(".lights-2", 0.15, { opacity: 1 })
		.to(".lights-2", 0.15, { opacity: 0 })
		.to(".lights-2", 0.15, { opacity: 1 })
		.to(".lights-2", 0.15, { opacity: 0 })
		// Slots disapeare 
		.to("#slot-main-wrapper", 1, { scale: 0, rotation: 45, ease: "power4.inOut" })
		.to("#header-winner", 1, { scale: 0, ease: "power4.inOut" }, "-=1")
		.staggerTo(".bottom-elements", 0.7, { scale: 1, y: 20, ease: "power4.inOut" }, 0.1, "-=.5")
		.to("#final-btn-wrapper", 1, { scale: 1, ease: Back.easeOut.config(1.7) }, "-=0.5")
		.to("#sling-logo", 1, { scale: 1, ease: Back.easeOut.config(1.7) }, "-=1")
		.staggerTo(".bottom-elements", 0.5, { scale: 1.1, ease: "power4.inOut" }, 0.1, "+=1")
		.staggerTo(".bottom-elements", 0.5, { scale: 1, ease: "power4.inOut" }, 0.1, "-=.5");
}

