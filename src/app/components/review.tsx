// "use client";
// import { useState } from "react";

// export default function Reviews() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [name, setName] = useState("");
//   const [review, setReview] = useState("");
//   const [reviews, setReviews] = useState([
//     {
//       name: "Alexander Rity",
//       rating: 5,
//       text: "Easy booking, great value! Cozy rooms at a reasonable price in Sheffield’s vibrant center.",
//     },
//     {
//       name: "Emma Creight",
//       rating: 4,
//       text: "Effortless booking, unbeatable affordability! Peaceful gem.",
//     },
//   ]);

//   const handleSubmitReview = () => {
//     if (name && rating && review) {
//       // Add the new review to the existing list
//       const newReview = {
//         name,
//         rating: parseInt(rating),
//         text: review,
//       };
//       setReviews([...reviews, newReview]);

//       // Reset the popup and form fields
//       setShowPopup(false);
//       setRating(0);
//       setReview("");
//       setName("");
//     } else {
//       alert("Please fill out all fields!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800">
//       {/* Reviews Section */}
//       <div className="container mx-auto py-10 px-4">
//         {/* Main Review Card */}
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h1 className="text-2xl font-bold mb-4">Reviews</h1>

//           {/* Summary */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//             {/* Rating Overview */}
//             <div className="flex items-center">
//               <h2 className="text-4xl font-bold">4.0</h2>
//               <div className="ml-4">
//                 <div className="flex items-center">
//                   <span className="text-yellow-500 text-lg">★ ★ ★ ★ ☆</span>
//                 </div>
//                 <p className="text-gray-500">35k ratings</p>
//               </div>
//             </div>
//           </div>

//           {/* Reviews List */}
//           <div>
//             <div className="border-t pt-4 mt-4">
//               {reviews.map((review, index) => (
//                 <div key={index} className="mb-4">
//                   <h3 className="font-bold">{review.name}</h3>
//                   <div className="flex items-center text-yellow-500">
//                     {"★".repeat(review.rating) +
//                       "☆".repeat(5 - review.rating)}
//                   </div>
//                   <p>{review.text}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Button to Open Popup */}
//           <button
//             className="bg-blue-600 text-white py-2 px-4 rounded mt-6"
//             onClick={() => setShowPopup(true)}
//           >
//             Write Your Review
//           </button>
//         </div>
//       </div>

//       {/* Popup for Review Submission */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Write Your Review</h2>

//             {/* Rating Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Rating</label>
//               <select
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//               >
//                 <option value="0">Select a rating</option>
//                 <option value="5">5 - Excellent</option>
//                 <option value="4">4 - Good</option>
//                 <option value="3">3 - Average</option>
//                 <option value="2">2 - Poor</option>
//                 <option value="1">1 - Terrible</option>
//               </select>
//             </div>

//             {/* Name Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Name</label>
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 placeholder="Your Name"
//               />
//             </div>

//             {/* Review Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Review</label>
//               <textarea
//                 value={review}
//                 onChange={(e) => setReview(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 rows="4"
//                 placeholder="Write your review here..."
//               ></textarea>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end space-x-4">
//               <button
//                 className="bg-gray-300 py-2 px-4 rounded"
//                 onClick={() => setShowPopup(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-600 text-white py-2 px-4 rounded"
//                 onClick={handleSubmitReview}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
