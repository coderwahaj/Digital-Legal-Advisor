import { useState } from 'react';
import { X } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose, onSubmit, feedbackType = 'chatbot' }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [followUp, setFollowUp] = useState(null);

  const handleSubmit = () => {
    const feedbackData = {
      rating,
      feedback,
      followUp,
      type: feedbackType,
      timestamp: new Date().toISOString()
    };
    
    onSubmit?.(feedbackData);
    
    // Reset form
    setRating(0);
    setFeedback('');
    setFollowUp(null);
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setRating(0);
    setFeedback('');
    setFollowUp(null);
    onClose();
  };

  if (!isOpen) return null;

  const getFeedbackPrompt = () => {
    switch (feedbackType) {
      case 'summarizer':
        return 'What do you think of the document summary?';
      case 'precedents':
        return 'What do you think of the legal precedents results?';
      default:
        return 'What do you think of the response given by our chatbot?';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 lg:p-8 relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 text-gray-800 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 
          className="text-xl lg: text-2xl font-semibold mb-2 text-[#29473E]"
          style={{ fontFamily: 'Ropa Sans' }}
        >
          Give Feedback
        </h2>

        {/* Subtitle */}
        <p 
          className="text-sm text-gray-500 mb-6"
          style={{ fontFamily: 'Noto Sans' }}
        >
          {getFeedbackPrompt()}
        </p>

        {/* Star Rating */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
              aria-label={`Rate ${star} stars`}
            >
              {star <= rating ?  (
                // Filled Star
                <svg
                  width="40"
                  height="36"
                  viewBox="0 0 40 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 lg:w-10 lg:h-9"
                >
                  <path
                    d="M18.0067 1.23614L13.472 10.4306L3.32615 11.9097C1.50671 12.1736 0.777539 14.4167 2.09698 15.7014L9.43726 22.8542L7.70115 32.9584C7.38865 34.7847 9.31226 36.1528 10.9234 35.2986L19.9998 30.5278L29.0762 35.2986C30.6873 36.1459 32.6109 34.7847 32.2984 32.9584L30.5623 22.8542L37.9025 15.7014C39.222 14.4167 38.4928 12.1736 36.6734 11.9097L26.5275 10.4306L21.9928 1.23614C21.1803 -0.402752 18.8261 -0.423585 18.0067 1.23614Z"
                    fill="#000000"
                  />
                </svg>
              ) : (
                // Empty Star
                <svg
                  width="40"
                  height="36"
                  viewBox="0 0 40 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 lg:w-10 lg:h-9"
                >
                  <path
                    d="M36.6734 11.9097L26.5275 10.4306L21.9928 1.23614C21.1803 -0.402752 18.8261 -0.423585 18.0067 1.23614L13.472 10.4306L3.32615 11.9097C1.50671 12.1736 0.777539 14.4167 2.09698 15.7014L9.43726 22.8542L7.70115 32.9584C7.38865 34.7847 9.31226 36.1528 10.9234 35.2986L19.9998 30.5278L29.0762 35.2986C30.6873 36.1459 32.6109 34.7847 32.2984 32.9584L30.5623 22.8542L37.9025 15.7014C39.222 14.4167 38.4928 12.1736 36.6734 11.9097ZM26.9859 21.6875L28.6317 31.2986L19.9998 26.7639L11.3678 31.2986L13.0136 21.6875L6.02754 14.882L15.6803 13.4792L19.9998 4.72919L24.3192 13.4792L33.972 14.882L26.9859 21.6875Z"
                    fill="#000000"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Feedback Text */}
        <h3 
          className="text-base font-semibold text-gray-700 mb-3"
          style={{ fontFamily: 'Noto Sans' }}
        >
          Do you have any thoughts you'd like to share? 
        </h3>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target. value)}
          placeholder="Enter your feedback here..."
          className="w-full border-2 border-[#29473E] rounded-lg p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#29473E] focus:ring-opacity-50 mb-6 resize-none"
          style={{ fontFamily: 'Noto Sans' }}
          rows={5}
        />

        {/* Follow-up Question */}
        <div className="mb-6">
          <p 
            className="text-base font-semibold text-gray-700 mb-3"
            style={{ fontFamily: 'Noto Sans' }}
          >
            May we follow you up on your feedback?
          </p>
          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="followup"
                value="yes"
                checked={followUp === 'yes'}
                onChange={() => setFollowUp('yes')}
                className="w-4 h-4 accent-[#29473E]"
              />
              <span 
                className="text-base text-gray-500"
                style={{ fontFamily: 'Noto Sans' }}
              >
                Yes
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="followup"
                value="no"
                checked={followUp === 'no'}
                onChange={() => setFollowUp('no')}
                className="w-4 h-4 accent-[#29473E]"
              />
              <span 
                className="text-base text-gray-500"
                style={{ fontFamily: 'Noto Sans' }}
              >
                No
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="px-6 py-2 rounded-lg font-semibold text-white bg-[#29473E] hover:bg-[#1f3630] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Noto Sans' }}
          >
            Send
          </button>
          <button
            onClick={handleCancel}
            className="border-2 border-gray-300 text-gray-500 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            style={{ fontFamily: 'Noto Sans' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;