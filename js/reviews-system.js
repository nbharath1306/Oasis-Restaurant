// Customer Reviews & Ratings System
class ReviewsSystem {
    constructor() {
        this.reviews = [];
        this.currentRating = 0;
        this.selectedPhotos = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadSampleReviews();
        this.setupRatingInput();
        this.setupPhotoUpload();
        this.setupReviewForm();
        this.setupFilters();
        this.renderReviews();
        this.updateStatistics();
        console.log('Reviews System initialized');
    }

    loadSampleReviews() {
        this.reviews = [
            {
                id: 1,
                name: "Priya Sharma",
                avatar: "PS",
                rating: 5,
                date: "2025-11-10",
                review: "Absolutely amazing experience! The Hyderabadi Biryani was out of this world. Perfect blend of spices and the mutton was so tender. The ambiance is great for family dining. Will definitely come back!",
                images: ["assets/Images/Biryani.jpg"],
                helpful: 23,
                verified: true,
                category: "food"
            },
            {
                id: 2,
                name: "Rahul Kumar",
                avatar: "RK",
                rating: 4,
                date: "2025-11-09",
                review: "Great food and service! The Tandoori Chicken was perfectly cooked. Staff was very attentive. Only minor issue was the waiting time during peak hours.",
                images: ["assets/Images/Tandoori.jpg"],
                helpful: 18,
                verified: true,
                category: "service"
            },
            {
                id: 3,
                name: "Anjali Reddy",
                avatar: "AR",
                rating: 5,
                date: "2025-11-08",
                review: "Love the vegetarian options here! The Paneer Butter Masala was creamy and flavorful. Great place for vegetarians. The atmosphere is cozy and perfect for dates.",
                images: [],
                helpful: 31,
                verified: true,
                category: "food"
            },
            {
                id: 4,
                name: "Siddharth M",
                avatar: "SM",
                rating: 4,
                date: "2025-11-07",
                review: "Excellent ambiance and the staff is very polite. Food quality is consistently good. Parking is convenient. Would recommend for family gatherings.",
                images: ["assets/Images/Family.jpg"],
                helpful: 12,
                verified: false,
                category: "ambiance"
            },
            {
                id: 5,
                name: "Meera Krishnan",
                avatar: "MK",
                rating: 5,
                date: "2025-11-06",
                review: "Outstanding seafood! The Fish Tikka was fresh and perfectly marinated. The chef really knows how to bring out the flavors. This is now our go-to place for special occasions.",
                images: ["assets/Images/kebabs.jpg"],
                helpful: 27,
                verified: true,
                category: "food"
            },
            {
                id: 6,
                name: "Arjun Patel",
                avatar: "AP",
                rating: 3,
                date: "2025-11-05",
                review: "Food was decent but service could be improved. The waiting time was longer than expected even though we had a reservation. Food quality is good when it arrives.",
                images: [],
                helpful: 8,
                verified: true,
                category: "service"
            }
        ];
    }

    setupRatingInput() {
        const ratingStars = document.querySelectorAll('.rating-star-input');
        const ratingDescription = document.querySelector('.rating-description');
        
        const descriptions = {
            1: "Poor - Not satisfied",
            2: "Fair - Below expectations", 
            3: "Good - Meets expectations",
            4: "Very Good - Exceeds expectations",
            5: "Excellent - Outstanding experience"
        };

        ratingStars.forEach((star, index) => {
            star.addEventListener('click', () => {
                this.currentRating = index + 1;
                this.updateRatingDisplay();
                if (ratingDescription) {
                    ratingDescription.textContent = descriptions[this.currentRating];
                }
            });

            star.addEventListener('mouseover', () => {
                this.highlightStars(index + 1, true);
                if (ratingDescription) {
                    ratingDescription.textContent = descriptions[index + 1];
                }
            });
        });

        const ratingContainer = document.querySelector('.rating-input-stars');
        if (ratingContainer) {
            ratingContainer.addEventListener('mouseleave', () => {
                this.updateRatingDisplay();
                if (ratingDescription && this.currentRating > 0) {
                    ratingDescription.textContent = descriptions[this.currentRating];
                } else if (ratingDescription) {
                    ratingDescription.textContent = "Click to rate your experience";
                }
            });
        }
    }

    updateRatingDisplay() {
        const ratingStars = document.querySelectorAll('.rating-star-input');
        ratingStars.forEach((star, index) => {
            if (index < this.currentRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    highlightStars(count, isHover = false) {
        const ratingStars = document.querySelectorAll('.rating-star-input');
        ratingStars.forEach((star, index) => {
            if (index < count) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    setupPhotoUpload() {
        const uploadArea = document.querySelector('.photo-upload-area');
        const fileInput = document.getElementById('reviewPhotos');
        const previewContainer = document.querySelector('.photo-preview');

        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => {
                fileInput.click();
            });

            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = 'var(--primary-color)';
                uploadArea.style.background = 'rgba(212, 175, 55, 0.1)';
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                uploadArea.style.background = 'rgba(212, 175, 55, 0.02)';
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                uploadArea.style.background = 'rgba(212, 175, 55, 0.02)';
                
                const files = Array.from(e.dataTransfer.files);
                this.handlePhotoSelection(files);
            });

            fileInput.addEventListener('change', (e) => {
                const files = Array.from(e.target.files);
                this.handlePhotoSelection(files);
            });
        }
    }

    handlePhotoSelection(files) {
        const validFiles = files.filter(file => file.type.startsWith('image/'));
        
        validFiles.forEach(file => {
            if (this.selectedPhotos.length < 5) { // Limit to 5 photos
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.selectedPhotos.push({
                        file: file,
                        preview: e.target.result,
                        id: Date.now() + Math.random()
                    });
                    this.updatePhotoPreview();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    updatePhotoPreview() {
        const previewContainer = document.querySelector('.photo-preview');
        if (!previewContainer) return;

        previewContainer.innerHTML = this.selectedPhotos.map(photo => `
            <div class="photo-preview-item">
                <img src="${photo.preview}" alt="Review photo" class="photo-preview-image">
                <button class="photo-remove-btn" onclick="reviewsSystem.removePhoto('${photo.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    removePhoto(photoId) {
        this.selectedPhotos = this.selectedPhotos.filter(photo => photo.id !== photoId);
        this.updatePhotoPreview();
    }

    setupReviewForm() {
        const reviewForm = document.querySelector('.review-form');
        if (!reviewForm) return;

        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReview();
        });
    }

    async submitReview() {
        const form = document.querySelector('.review-form');
        const formData = new FormData(form);
        
        const reviewData = {
            name: formData.get('reviewerName') || 'Anonymous',
            email: formData.get('reviewerEmail'),
            rating: this.currentRating,
            review: formData.get('reviewText'),
            images: this.selectedPhotos.map(photo => photo.preview),
            date: new Date().toISOString().split('T')[0],
            helpful: 0,
            verified: false,
            category: 'general'
        };

        if (!this.validateReview(reviewData)) {
            return;
        }

        // Show loading state
        const submitBtn = document.querySelector('.submit-review-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Add review to local data
            const newReview = {
                ...reviewData,
                id: Date.now(),
                avatar: this.generateAvatar(reviewData.name)
            };
            
            this.reviews.unshift(newReview);
            this.renderReviews();
            this.updateStatistics();
            this.resetForm();
            this.showSuccessMessage();
            
        } catch (error) {
            this.showErrorMessage('Failed to submit review. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    validateReview(reviewData) {
        if (reviewData.rating === 0) {
            this.showErrorMessage('Please provide a rating');
            return false;
        }
        
        if (!reviewData.review || reviewData.review.trim().length < 10) {
            this.showErrorMessage('Please write a review with at least 10 characters');
            return false;
        }
        
        return true;
    }

    generateAvatar(name) {
        const words = name.trim().split(' ');
        if (words.length >= 2) {
            return words[0][0].toUpperCase() + words[1][0].toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    resetForm() {
        const form = document.querySelector('.review-form');
        if (form) {
            form.reset();
        }
        
        this.currentRating = 0;
        this.selectedPhotos = [];
        this.updateRatingDisplay();
        this.updatePhotoPreview();
        
        const ratingDescription = document.querySelector('.rating-description');
        if (ratingDescription) {
            ratingDescription.textContent = "Click to rate your experience";
        }
    }

    setupFilters() {
        const filterBtns = document.querySelectorAll('.review-filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Set current filter
                this.currentFilter = btn.dataset.filter;
                
                // Re-render reviews
                this.renderReviews();
            });
        });
    }

    getFilteredReviews() {
        if (this.currentFilter === 'all') {
            return this.reviews;
        }
        
        if (this.currentFilter === 'verified') {
            return this.reviews.filter(review => review.verified);
        }
        
        if (this.currentFilter === 'photos') {
            return this.reviews.filter(review => review.images && review.images.length > 0);
        }
        
        // Filter by rating
        const rating = parseInt(this.currentFilter);
        if (!isNaN(rating)) {
            return this.reviews.filter(review => review.rating === rating);
        }
        
        return this.reviews;
    }

    renderReviews() {
        const reviewsContainer = document.querySelector('.reviews-grid');
        if (!reviewsContainer) return;

        const filteredReviews = this.getFilteredReviews();
        
        if (filteredReviews.length === 0) {
            reviewsContainer.innerHTML = `
                <div class="no-reviews">
                    <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                        <i class="fas fa-comment-alt" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                        <p>No reviews found for the selected filter.</p>
                    </div>
                </div>
            `;
            return;
        }

        reviewsContainer.innerHTML = filteredReviews.map(review => this.renderReviewCard(review)).join('');
        
        // Add event listeners
        this.attachReviewListeners();
    }

    renderReviewCard(review) {
        const stars = this.generateStars(review.rating);
        const timeAgo = this.getTimeAgo(review.date);
        const images = review.images && review.images.length > 0 ? 
            `<div class="review-images">
                ${review.images.map(img => `<img src="${img}" alt="Review photo" class="review-image" onclick="reviewsSystem.openImageModal('${img}')">`).join('')}
            </div>` : '';

        const verifiedBadge = review.verified ? 
            '<span style="color: #4CAF50; font-size: 0.8rem; margin-left: 0.5rem;"><i class="fas fa-check-circle"></i> Verified</span>' : '';

        return `
            <div class="review-card" data-review-id="${review.id}">
                <div class="review-header">
                    <div class="reviewer-avatar">${review.avatar}</div>
                    <div class="reviewer-info">
                        <div class="reviewer-name">${review.name}${verifiedBadge}</div>
                        <div class="review-date">${timeAgo}</div>
                    </div>
                    <div class="review-rating">
                        <div class="review-stars">${stars}</div>
                        <div class="review-score">${review.rating}/5</div>
                    </div>
                </div>
                <div class="review-content">
                    <p class="review-text">${review.review}</p>
                </div>
                ${images}
                <div class="review-actions">
                    <div class="review-helpful">
                        <button class="helpful-btn" onclick="reviewsSystem.markHelpful(${review.id})">
                            <i class="fas fa-thumbs-up"></i>
                            <span class="helpful-count">${review.helpful}</span>
                        </button>
                        <span style="color: var(--text-light); font-size: 0.8rem;">Helpful</span>
                    </div>
                    <button class="review-reply-btn" onclick="reviewsSystem.replyToReview(${review.id})">
                        Reply
                    </button>
                </div>
            </div>
        `;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    }

    updateStatistics() {
        const totalReviews = this.reviews.length;
        const averageRating = totalReviews > 0 ? 
            (this.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1) : 0;

        // Update overall rating display
        const ratingNumber = document.querySelector('.rating-number');
        const totalReviewsElement = document.querySelector('.total-reviews');
        const ratingStarsLarge = document.querySelector('.rating-stars-large');

        if (ratingNumber) ratingNumber.textContent = averageRating;
        if (totalReviewsElement) totalReviewsElement.textContent = `Based on ${totalReviews} reviews`;
        if (ratingStarsLarge) ratingStarsLarge.innerHTML = this.generateStars(parseFloat(averageRating));

        // Update rating breakdown
        this.updateRatingBreakdown();
    }

    updateRatingBreakdown() {
        const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        
        this.reviews.forEach(review => {
            ratingCounts[review.rating]++;
        });

        const total = this.reviews.length;

        for (let rating = 5; rating >= 1; rating--) {
            const count = ratingCounts[rating];
            const percentage = total > 0 ? (count / total) * 100 : 0;
            
            const fillElement = document.querySelector(`.rating-fill[data-rating="${rating}"]`);
            const countElement = document.querySelector(`.rating-count[data-rating="${rating}"]`);
            
            if (fillElement) {
                fillElement.style.width = `${percentage}%`;
            }
            
            if (countElement) {
                countElement.textContent = count;
            }
        }
    }

    attachReviewListeners() {
        // Add any additional event listeners for review interactions
    }

    markHelpful(reviewId) {
        const review = this.reviews.find(r => r.id === reviewId);
        if (review) {
            review.helpful++;
            this.renderReviews();
        }
    }

    replyToReview(reviewId) {
        console.log(`Reply to review ${reviewId} - functionality to be implemented`);
        this.showInfoMessage('Reply functionality coming soon!');
    }

    openImageModal(imageSrc) {
        // Create and show image modal
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        modal.innerHTML = `
            <img src="${imageSrc}" style="max-width: 90vw; max-height: 90vh; border-radius: 8px;">
            <button style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.8); border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        document.body.appendChild(modal);
    }

    showSuccessMessage() {
        this.showMessage('Thank you for your review! 🎉', 'success');
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    showInfoMessage(message) {
        this.showMessage(message, 'info');
    }

    showMessage(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `review-notification ${type}`;
        notification.textContent = message;
        
        const bgColors = {
            success: 'linear-gradient(135deg, #4CAF50, #45a049)',
            error: 'linear-gradient(135deg, #f44336, #d32f2f)',
            info: 'var(--primary-gradient)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColors[type]};
            color: ${type === 'info' ? 'var(--text-dark)' : 'white'};
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow-medium);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
}

// Initialize the reviews system
let reviewsSystem;

document.addEventListener('DOMContentLoaded', () => {
    reviewsSystem = new ReviewsSystem();
});