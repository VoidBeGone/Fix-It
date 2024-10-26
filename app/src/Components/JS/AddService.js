import React, { useState, useEffect, useRef } from 'react';
import '../style/AddService.css'; 
import { gsap } from 'gsap';

function AddService({ resetService }) {
  // State to store service information
  const [serviceInfo, setServiceInfo] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: '',
    image: null, // New image field
  });
  
  const modelRef = useRef();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceInfo({ ...serviceInfo, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setServiceInfo({ ...serviceInfo, image: reader.result }); // Save image as base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Service Information Submitted:', serviceInfo);
    // Here, you'd typically send this data to the backend or store it
    // Reset the form after submission
    setServiceInfo({
      title: '',
      description: '',
      category: '',
      price: '',
      location: '',
      image: null, // Reset image field
    });
    animateOut(resetService);
  };

  // Animate out function
  const animateOut = (callback) => {
    gsap.to(modelRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      ease: "sine.out",
      onComplete: callback,
    });
  };

  // Add animations for entrance and exit
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      modelRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "sine2.in" }
    );

    const handleClickOutside = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        animateOut(resetService);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [resetService]);

  return (
    <div className="AddServiceContainer">
      <div className="AddServiceCard" ref={modelRef}>
        <h2>Add a New Service</h2>

        <form onSubmit={handleSubmit}>
          <div className="AddServiceInput">
            <label htmlFor="title">Service Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={serviceInfo.title}
              onChange={handleInputChange}
              placeholder="Enter service title"
              required
            />
          </div>

          <div className="AddServiceInput">
            <label htmlFor="description">Service Description</label>
            <textarea
              id="description"
              name="description"
              value={serviceInfo.description}
              onChange={handleInputChange}
              placeholder="Enter service description"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="AddServiceInput">
            <label htmlFor="category">Service Category</label>
            <select
              id="category"
              name="category"
              value={serviceInfo.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Painting">Painting</option>
              <option value="Construction">Construction</option>
            </select>
          </div>

          <div className="AddServiceInput">
            <label htmlFor="price">Price (in $)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={serviceInfo.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="AddServiceInput">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={serviceInfo.location}
              onChange={handleInputChange}
              placeholder="Enter location (optional)"
            />
          </div>

          {/* Image upload */}
          <div className="AddServiceInput">
            <label htmlFor="image">Upload Service Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {/* Display uploaded image */}
          {serviceInfo.image && (
            <div className="AddServiceImage">
              <img src={serviceInfo.image} alt="Service Preview" />
            </div>
          )}

          <button type="submit" className="AddServiceBtn">Add Service</button>
        </form>
      </div>
    </div>
  );
}

export default AddService;
