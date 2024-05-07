//Javascript for 3D effects and rotation effect on each card
const cards = document.querySelectorAll(".card-body");

cards.forEach((card)=> {
    //rotate each card on mousemove
    card.addEventListener("mousemove", (e)=> {
        let cardInnerHeight = card.clientHeight;
        let cardInnerWidth = card.clientWidth;

        //console.log("Inner Height: " + cardInnerHeight);
        //console.log("Inner width: " + cardInnerwidth);

        let rect = card.getBoundingClientRect();
        let cardXposition = e.clientX - rect.left;
        let cardYposition = e.clientY - rect.top;

       // console.log("Card X position: " + cardXposition); 
        // console.log("Card Y position: " + cardYposition);

        let rotateSpeed = 25; //Value to change the rotate speed

        // You can adjust xCustom and yCustom value
        let xCustom = 2.5;
        let yCustom = 1,25;

        let x = (cardInnerHeight /xCustom - cardXposition)/rotateSpeed;
        let y = (cardInnerwidth /yCustom - cardYposition)/rotateSpeed;

        card.style.transform = "rotateY(" + x + "deg) rotateX(" + y + "deg)";  
    });

    // card element 3d effects on mouseover
    const cardFigure = card.querySelector("card-figure");
    const cardName = card.querySelector("card-name");
    const cardDescription = card.querySelector("card-description");
    const cardMedia = card.querySelector("card-media");

    card.addEventListener("mouseover", () => {
        cardFigure.style.transform = "translate3d(0, 0, 150px)";
        cardName.style.transform = "translate3d(0, 0, 180px)";
        cardDescription.style.transform = "translate3d(0, 0, 190px)";
        cardMedia.style.transform = "translate3d(0, 0, 140px)";
        card.style.transition = "none";
    });

    //remove card rotation effect and 3d effect on mouseout
    card.addEventListener("mouseout", () => {
        cardFigure.style.transform = "translate3d(0, 0, 0)";
        cardName.style.transform = "translate3d(0, 0, 0)";
        cardDescription.style.transform = "translate3d(0, 0, 0)";
        cardMedia.style.transform = "translate3d(0, 0, 0)";
        card.style.transform = "rotateY(0deg) rotateX(0deg)";  
        card.style.transition = "transfor .5s ease";
    });

})