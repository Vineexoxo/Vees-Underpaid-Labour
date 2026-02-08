// TODO: Replace image paths with your own images in /public/images/
// Example: If your image is at /public/images/photo1.jpg, use "/images/photo1.jpg"

export const pagesData = [
  {
    id: 1,
    content: {
      imageURL: "/images/page1_front.jpg", // Your image file
      quoteText: "Hi Saatvika! Here is what my overtimed overworked underpaid brain made for you",
      cloudMessage: "Hi Vee! Sit your nerdy ass down. Relax those dove eyes. And STOP scrolling linkedin.", // TODO: Write your introduction/greeting/flirty message here
      backgroundColor: "bg-romantic-pink-light",
    },
  },
  {
    id: 2,
    content: {
      type: "collage",
      backgroundColor: "bg-romantic-cream-light",
      foodImages: [
        {
          imageURL: "/images/food1.jpg", // TODO: Replace with your food image path
          position: { top: "8%", left: "3%", rotation: -8, width: "22%" },
          rating: 9.5, // TODO: Replace with your rating (1-10)
        },
        {
          imageURL: "/images/food6.jpeg", // Your food image
          position: { top: "8%", left: "28%", rotation: 6, width: "22%" },
          rating: 8, // TODO: Replace with your rating (1-10)
        },
        {
          imageURL: "/images/food2.jpg", // TODO: Replace with your food image path
          position: { top: "10%", right: "5%", rotation: 12, width: "24%" },
          rating: 9, // TODO: Replace with your rating (1-10)
        },
        {
          imageURL: "/images/food3.jpg", // TODO: Replace with your food image path
          position: { bottom: "25%", left: "5%", rotation: -6, width: "23%" },
          rating: 8, // TODO: Replace with your rating (1-10)
        },
        {
          imageURL: "/images/food4.jpg", // TODO: Replace with your food image path
          position: { bottom: "20%", right: "15%", rotation: 10, width: "26%" },
          rating: 9.5, // TODO: Replace with your rating (1-10)
        },
        {
          imageURL: "/images/food5.jpg", // TODO: Replace with your food image path
          position: { top: "45%", left: "38%", rotation: -5, width: "20%" },
          rating: 5, // TODO: Replace with your rating (1-10)
        },
      ],
      quotes: [
        {
          text: "I am so fucking hungry just looking at them", // TODO: Replace with your quote
          position: { top: "5%", left: "50%", transform: "translateX(-50%)" },
          fontSize: "text-2xl",
        },
        {
          text: "(╯°□°)╯︵ ┻━┻ fuck it im ordering something", // TODO: Replace with your quote
          position: { bottom: "5%", right: "10%" },
          fontSize: "text-xl",
        },
      ],
    },
    date: "February 2024",
  },
  {
    id: 3,
    content: {
      type: "photoCollage",
      backgroundColor: "bg-romantic-pink-light",
      photos: [
        {
          imageURL: "/images/photo1.jpg",
          position: { top: "8%", left: "2%", rotation: -8, width: "22%" },
          rating: 10,
        },
        {
          imageURL: "/images/photo2.jpg",
          position: { top: "15%", right: "5%", rotation: 10, width: "26%" },
          rating: 10,
        },
        {
          imageURL: "/images/photo3.jpg",
          position: { bottom: "20%", left: "12%", rotation: -5, width: "21%" },
          rating: 10,
        },
        {
          imageURL: "/images/photo4.jpeg",
          position: { bottom: "20%", right: "8%", rotation: 7, width: "25%" },
          rating: 10,
        },
        {
          imageURL: "/images/photo5.jpg",
          position: { top: "48%", left: "42%", rotation: -6, width: "20%" },
          rating: 10,
        },
        {
          imageURL: "/images/photo6.jpg",
          position: { top: "30%", left: "35%", rotation: 4, width: "20%" },
          rating: 10,
        },
      ],
      quotes: [
        {
          text: "I may just be a btech boy, but no quant got a 7veeka ", // TODO: Replace with your quote
          position: { top: "5%", left: "50%", transform: "translateX(-50%)" },
          fontSize: "text-2xl",
        },
        {
          text: "12 inches of throbbing curly hair waiting for dyson💖", // TODO: Replace with your quote
          position: { bottom: "5%", right: "12%" },
          fontSize: "text-xl",
        },
      ],
    },
    date: "March 2024",
  },
  {
    id: 4,
    content: {
      type: "connectionsGame",
      backgroundColor: "bg-romantic-cream",
      groups: [
        {
          category: "Billion Dollar Unicorn Pitch Ideas",
          words: ["Cat", "Hedge Fund", "Step 2: ??", "Profit"],
        },
        {
          category: "Things I have had on your body",
          words: ["Doodle", "Marks", "Velcro", "Scarf"],
        },
        {
          category: "Things you are and readily admit to",
          words: ["Bottom", "Naive", "Dove", "Blind"],
        },
        {
          category: "Things you need to add to your Nykaa cart",
          words: ["Jhumke", "Kurti", "Toner", "Lipgloss"],
        },
      ],
    },
    date: "April 2024",
  },
  {
    id: 5,
    content: {
      imageURL: "/images/page5-front.jpg", // TODO: Replace with your image path in /public/images/
      quoteText: "Forever is not long enough when I'm with you",
      backgroundColor: "bg-romantic-pink-light",
    },
    date: "May 2024",
  },
];
