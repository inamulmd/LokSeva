import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import UseLocation from './UseLocation'; // Custom hook for location

const categories = {
  "Civic & Infrastructure Issues": [
    "Potholes on roads",
    "Damaged streetlights or traffic signals",
    "Broken footpaths or sidewalks",
    "Overflowing garbage or uncollected waste",
    "Blocked drains or sewage overflow",
    "Illegal construction",
    "Open manholes",
    "Water leakage or shortage",
  ],
  "Environmental Complaints": [
    "Illegal tree cutting",
    "Burning of waste",
    "Noise pollution (loudspeakers, honking, factories)",
    "Water pollution (dumping in rivers/lakes)",
    "Air pollution from factories or construction",
  ],
  "Public Safety": [
    "Eve teasing or harassment",
    "Theft or burglary",
    "Drunk driving",
    "Unauthorized gathering or riots",
    "Domestic violence",
    "Missing persons",
  ],
  "Administrative & Service Complaints": [
    "Corruption or bribery in government offices",
    "Delay in issuance of documents",
    "Unresponsive officials",
    "Problems in ration card, pension, or PDS",
  ],
  "Health & Sanitation": [
    "Mosquito breeding sites",
    "Unhygienic public toilets",
    "Food adulteration",
    "Unlicensed medical shops",
    "Waterborne disease outbreaks",
  ],
  "Education Related": [
    "Lack of teachers in government schools",
    "Poor school infrastructure",
    "Midday meal complaints",
    "Private school fee hikes",
  ],
  "Digital/Online Service Complaints": [
    "Issues with online portals",
    "Cybercrime or online fraud",
    "Non-functioning public WiFi",
    "Mobile/internet issues in rural areas",
  ],
  "Welfare Scheme Related": [
    "Delay in receiving pension",
    "MGNREGA job card/payment issues",
    "Non-receipt of subsidy",
    "Issues with PMAY/housing schemes",
  ],
};

const IssueReportForm = ({ onSubmit, user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    location: { lat: '', lng: '', city: '', region: '', country: '' },
    image: null,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { location, fetchLocation } = UseLocation(); // use custom hook

  // ✅ Sync location details from hook into formData
  useEffect(() => {
    if (location?.lat && location?.lng) {
      setFormData((prev) => ({
        ...prev,
        location: {
          lat: location.lat,
          lng: location.lng,
          city: location.city || '',
          region: location.region || '',
          country: location.country || '',
        },
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData((f) => ({
      ...f,
      category: selectedCategory,
      subcategory: '',
    }));
  };

  const handleImageChange = (e) => {
    setFormData((f) => ({ ...f, image: e.target.files[0] }));
  };

  const handleLocationFetch = () => {
    fetchLocation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = '';
      if (formData.image) {
        const imageRef = ref(storage, `images/${Date.now()}_${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const issueData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        subcategory: formData.subcategory,
        latitude: formData.location.lat,
        longitude: formData.location.lng,
        locationName: `${formData.location.city}, ${formData.location.region}, ${formData.location.country}`,
        imageUrl,
        userEmail: user?.email || 'Anonymous',
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'issues'), issueData);
      console.log("Issue saved with ID:", docRef.id);

      setFormData({
        title: '',
        description: '',
        category: '',
        subcategory: '',
        location: { lat: '', lng: '', city: '', region: '', country: '' },
        image: null,
      });

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      navigate('/report', { state: { categoryTitle: formData.category } });

      if (onSubmit) onSubmit();
    } catch (error) {
      console.error('Error submitting issue:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative max-w-xl mx-auto">
      {showPopup && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-xl shadow-md z-50 transition-all duration-500">
          ✅ Issue submitted by <strong>{user?.email || 'Anonymous'}</strong>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Report an Issue</h2>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            name="title"
            placeholder="Issue Title"
            onChange={handleChange}
            value={formData.title}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Describe the issue"
            onChange={handleChange}
            value={formData.description}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category"
            onChange={handleCategoryChange}
            value={formData.category}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {formData.category && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">Subcategory</label>
            <select
              name="subcategory"
              onChange={handleChange}
              value={formData.subcategory}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Subcategory</option>
              {categories[formData.category].map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleLocationFetch}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Use My Location
          </button>
          <span className="text-sm text-gray-500">
            {formData.location.lat && formData.location.lng
              ? `📍 (${formData.location.lat.toFixed(2)}, ${formData.location.lng.toFixed(2)})`
              : ''}
          </span>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-gray-700"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Issue'}
        </button>
      </form>
    </div>
  );
};

export default IssueReportForm;
