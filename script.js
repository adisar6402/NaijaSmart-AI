// NaijaSmart - AI Productivity Suite for Nigerians
// Author: Abdulrahman Adisa Amuda
// Built for #3MTT Showcase

class NaijaSmart {
    constructor() {
        this.currentSection = 'landing';
        this.chatHistory = [];
        this.quotes = [
            "🇳🇬 'No condition is permanent' - Keep pushing, your breakthrough is coming! 💪",
            "🌟 'Hustle smart, not just hard' - Work with wisdom and purpose! 🧠",
            "💰 'From grass to grace' - Every successful Nigerian started somewhere! 🚀",
            "📚 'Knowledge is power' - Keep learning, keep growing! 📖",
            "🤝 'Unity in diversity' - Together we rise, together we shine! ✨",
            "⚡ 'Naija no dey carry last' - Be a leader in your field! 👑",
            "🔥 'Your time will come' - Stay consistent, stay focused! ⏰",
            "💡 'Think outside the box' - Innovation is in our DNA! 🧬",
            "🏆 'Champions never quit' - Persistence pays in the end! 💎",
            "🌍 'Naija to the world' - Represent excellence everywhere! 🎯",
            "💪 'Strong head, strong will' - Mental toughness wins! 🏋️",
            "🎨 'Creativity flows in our blood' - Express your genius! 🎭",
            "📈 'Small small, we go reach there' - Progress is progress! 📊",
            "🙏 'God's time is the best' - Trust the process! ⏳",
            "🔑 'You hold the key to your success' - Unlock your potential! 🗝️"
        ];
        this.currentQuoteIndex = 0;
        this.taskTemplates = {
            business: [
                "Research your target market and competitors",
                "Create a simple business plan and budget",
                "Register your business with CAC (if applicable)",
                "Set up social media accounts (Instagram, WhatsApp Business)",
                "Develop your minimum viable product (MVP)",
                "Connect with potential customers and get feedback",
                "Establish partnerships with suppliers or collaborators"
            ],
            study: [
                "Create a detailed study schedule and stick to it",
                "Find quiet study spaces free from distractions",
                "Use the Pomodoro technique (25 min study, 5 min break)",
                "Form or join study groups with serious students",
                "Practice past questions and mock exams regularly",
                "Take care of your health - sleep, exercise, eat well",
                "Seek help from teachers when you don't understand"
            ],
            hustle: [
                "Identify your skills and how to monetize them",
                "Research online platforms for freelancing opportunities",
                "Create professional profiles on relevant platforms",
                "Network with people in your industry",
                "Start small and gradually increase your rates",
                "Deliver excellent work to build your reputation",
                "Save and reinvest part of your earnings"
            ],
            personal: [
                "Set clear, specific, and measurable goals",
                "Develop daily habits that align with your objectives",
                "Read books and content related to your goal",
                "Find a mentor or accountability partner",
                "Track your progress regularly and adjust as needed",
                "Celebrate small wins along the way",
                "Stay persistent even when motivation is low"
            ],
            youtube: [
                "Define your niche and target audience clearly",
                "Research popular content in your chosen niche",
                "Plan your first 10 videos in advance",
                "Invest in basic equipment (phone camera is fine to start)",
                "Learn basic video editing skills",
                "Create eye-catching thumbnails and titles",
                "Be consistent with your upload schedule"
            ],
            tech: [
                "Choose a specific programming language to focus on",
                "Start with free online courses and tutorials",
                "Practice coding daily, even if just for 30 minutes",
                "Build small projects to apply what you learn",
                "Join tech communities and forums for support",
                "Create a portfolio to showcase your work",
                "Apply for internships or entry-level positions"
            ]
        };
        
        this.init();
    }

    init() {
        this.loadTheme();
        this.setupEventListeners();
        this.loadChatHistory();
        this.setInitialTime();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Navigation
        document.querySelectorAll('[data-section]').forEach(element => {
            element.addEventListener('click', (e) => {
                const section = e.target.closest('[data-section]').dataset.section;
                this.showSection(section);
            });
        });

        // Chat functionality
        document.getElementById('sendChat').addEventListener('click', () => this.sendMessage());
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        document.getElementById('downloadChat').addEventListener('click', () => this.downloadChatHistory());
        document.getElementById('clearChat').addEventListener('click', () => this.clearChatHistory());

        // Summarize functionality
        document.getElementById('summarizeBtn').addEventListener('click', () => this.summarizeNotes());
        document.getElementById('copySummary').addEventListener('click', () => this.copySummary());
        document.getElementById('downloadSummary').addEventListener('click', () => this.downloadSummary());

        // Tasks functionality
        document.getElementById('generateTasks').addEventListener('click', () => this.generateTasks());
        document.getElementById('downloadTasks').addEventListener('click', () => this.downloadTasks());

        // Quotes functionality
        document.getElementById('newQuote').addEventListener('click', () => this.generateNewQuote());
        document.getElementById('copyQuote').addEventListener('click', () => this.copyQuote());
        document.getElementById('shareQuote').addEventListener('click', () => this.shareQuote());
    }

    // Theme Management
    toggleTheme() {
        const body = document.body;
        const themeIcon = document.getElementById('themeIcon');
        
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        
        themeIcon.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('naijasmart-theme', isDark ? 'dark' : 'light');
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('naijasmart-theme');
        const themeIcon = document.getElementById('themeIcon');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }

    // Navigation
    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
        }

        // Add active class to corresponding nav tab
        const activeTab = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeTab && activeTab.classList.contains('nav-tab')) {
            activeTab.classList.add('active');
        }
    }

    // Chat Functionality
    setInitialTime() {
        const timeElement = document.getElementById('initialTime');
        if (timeElement) {
            timeElement.textContent = this.formatTime(new Date());
        }
    }

    loadChatHistory() {
        const saved = localStorage.getItem('naijasmart-chat');
        if (saved) {
            this.chatHistory = JSON.parse(saved);
            this.displayChatHistory();
        }
    }

    saveChatHistory() {
        localStorage.setItem('naijasmart-chat', JSON.stringify(this.chatHistory));
    }

    displayChatHistory() {
        const chatMessages = document.getElementById('chatMessages');
        const initialMessage = chatMessages.querySelector('.chat-message.bot');
        
        // Clear except initial message
        const userMessages = chatMessages.querySelectorAll('.chat-message:not(.bot)');
        userMessages.forEach(msg => msg.remove());
        
        // Add saved messages
        this.chatHistory.forEach(message => {
            this.addMessageToChat(message.text, message.isUser, message.timestamp, false);
        });
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        const timestamp = new Date();
        this.addMessageToChat(message, true, timestamp);
        this.chatHistory.push({ text: message, isUser: true, timestamp: timestamp.toISOString() });

        // Clear input
        input.value = '';

        // Show loading
        this.showLoading('AI is thinking...');

        // Simulate AI processing time
        setTimeout(() => {
            this.hideLoading();
            const response = this.getAIResponse(message);
            const responseTime = new Date();
            this.addMessageToChat(response, false, responseTime, true);
            this.chatHistory.push({ text: response, isUser: false, timestamp: responseTime.toISOString() });
            this.saveChatHistory();
        }, 1500 + Math.random() * 1000);
    }

    addMessageToChat(text, isUser, timestamp, animate = false) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textP = document.createElement('p');
        contentDiv.appendChild(textP);
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.formatTime(timestamp);
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        chatMessages.appendChild(messageDiv);

        if (animate && !isUser) {
            this.typeMessage(textP, text);
        } else {
            textP.textContent = text;
        }

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    typeMessage(element, text) {
        let index = 0;
        element.textContent = '';
        
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 30);
    }

    getAIResponse(input) {
        const q = input.toLowerCase();
        
        // Define keyword categories with variations
        const keywords = {
            study: ["study", "studying", "school", "exam", "read", "reading", "learn", "learning", "education", "student", "academic", "book", "notes", "test", "quiz"],
            business: ["business", "startup", "company", "entrepreneur", "entrepreneurship", "venture", "enterprise", "start a business", "business idea", "commerce"],
            money: ["money", "cash", "make money", "earn money", "income", "salary", "profit", "wealth", "rich", "financial", "side hustle", "hustle", "earn", "pay"],
            relationship: ["relationship", "love", "dating", "partner", "girlfriend", "boyfriend", "marriage", "breakup", "romance", "couple", "heart"],
            motivation: ["lazy", "motivation", "motivate", "discipline", "goal", "focus", "procrastination", "unmotivated", "inspiration", "drive", "ambition"],
            tech: ["programming", "coding", "tech", "technology", "software", "developer", "code", "computer", "website", "app"],
            youtube: ["youtube", "content creation", "video", "channel", "creator", "vlog", "streaming"],
            freelancing: ["freelancing", "remote work", "upwork", "fiverr", "gig", "contract", "independent"],
            abroad: ["japa", "abroad", "relocate", "immigration", "visa", "travel", "overseas", "foreign"],
            health: ["depression", "sad", "mental health", "anxiety", "stress", "wellbeing", "therapy"]
        };

        const responses = {
            study: "Try the Pomodoro technique: study 25 minutes, then take a 5-minute break. Find past questions and practice regularly. Join serious study groups! 📚",
            business: "Start small: register with CAC, learn your market, and use WhatsApp or Instagram to reach customers. Focus on solving a real problem people face! 🚀",
            money: "Consider freelancing, digital services, mini-importation, or small trading using your skills. Start online with platforms like Fiverr or social media! 💰",
            relationship: "Communicate openly, respect boundaries, and support each other's growth. Trust and understanding are the foundation of any good relationship! 💕",
            motivation: "Discipline beats motivation. Set small daily goals and celebrate your progress. Remember: 'No condition is permanent' - keep pushing! 💪",
            tech: "Start with free resources like freeCodeCamp, practice daily, and build projects. Join tech communities for support. The tech space needs more Nigerians! 💻",
            youtube: "Start with what you have - your phone camera is enough! Focus on your niche, be consistent, and engage with your audience. Quality over quantity! 🎥",
            freelancing: "Build a strong portfolio, start with lower rates to gain reviews, and deliver excellent work. Platforms like Upwork, Fiverr, and LinkedIn are great starting points! 🌐",
            abroad: "Focus on building skills that are globally relevant, save money, research visa requirements, and network with people in your target country. Preparation is key! ✈️",
            health: "Your mental health matters! Talk to someone you trust, consider professional help if needed, and remember that it's okay not to be okay. You're not alone! 🤗"
        };

        // Check each category for keyword matches
        for (const [category, keywordList] of Object.entries(keywords)) {
            if (keywordList.some(keyword => q.includes(keyword))) {
                return responses[category];
            }
        }

        // Special cases for specific phrases
        if (q.includes("ai tools") || q.includes("productivity tools")) {
            return "Explore free tools like ChatGPT, Canva, and NaijaSmart to boost productivity. Use technology to work smarter, not harder! 🤖";
        }
        if (q.includes("time management")) {
            return "Use time-blocking, prioritize important tasks first, and eliminate distractions. Remember: 'Time na money' - use it wisely! ⏰";
        }
        
        return "Try rephrasing your question or ask about business, study, money, relationships, or personal development. I'm here to help! 😊";
    }

    downloadChatHistory() {
        if (this.chatHistory.length === 0) {
            alert('No chat history to download!');
            return;
        }

        let content = "NaijaSmart Chat History\n";
        content += "========================\n\n";
        
        this.chatHistory.forEach(message => {
            const time = this.formatTime(new Date(message.timestamp));
            const sender = message.isUser ? "You" : "AI Assistant";
            content += `[${time}] ${sender}: ${message.text}\n\n`;
        });
        
        content += "Generated by NaijaSmart - AI Productivity Suite\n";
        content += "Built by Abdulrahman Adisa Amuda for #3MTT Showcase";
        
        this.downloadFile(content, 'naijasmart-chat-history.txt');
    }

    clearChatHistory() {
        if (confirm('Are you sure you want to clear all chat history?')) {
            this.chatHistory = [];
            localStorage.removeItem('naijasmart-chat');
            
            // Reset chat display
            const chatMessages = document.getElementById('chatMessages');
            const initialMessage = chatMessages.querySelector('.chat-message.bot');
            chatMessages.innerHTML = '';
            chatMessages.appendChild(initialMessage);
        }
    }

    // Summarize Functionality
    summarizeNotes() {
        const notesInput = document.getElementById('notesInput');
        const text = notesInput.value.trim();
        
        if (!text) {
            alert('Please enter some notes to summarize!');
            return;
        }

        this.showLoading('Analyzing your notes...');

        setTimeout(() => {
            this.hideLoading();
            const summary = this.generateSummary(text);
            this.displaySummary(summary);
            localStorage.setItem('naijasmart-last-summary', summary);
        }, 2000);
    }

    generateSummary(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.toLowerCase().split(/\s+/);
        
        // Extract key points (longer sentences with important keywords)
        const keyPoints = [];
        const importantWords = ['important', 'key', 'main', 'significant', 'crucial', 'essential', 'note', 'remember', 'first', 'second', 'third', 'finally', 'conclusion'];
        
        sentences.forEach(sentence => {
            const sentenceWords = sentence.toLowerCase().split(/\s+/);
            const hasImportantWords = sentenceWords.some(word => importantWords.includes(word));
            if (sentence.trim().length > 50 || hasImportantWords) {
                keyPoints.push(sentence.trim());
            }
        });

        // Extract keywords (most frequent meaningful words)
        const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'this', 'that', 'these', 'those'];
        const wordFreq = {};
        
        words.forEach(word => {
            const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
            if (cleanWord.length > 3 && !stopWords.includes(cleanWord)) {
                wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
            }
        });

        const keywords = Object.entries(wordFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(entry => entry[0]);

        let summary = "📋 **Summary**\n\n";
        
        if (keyPoints.length > 0) {
            summary += "**Key Points:**\n";
            keyPoints.slice(0, 5).forEach((point, index) => {
                summary += `${index + 1}. ${point}\n`;
            });
            summary += "\n";
        }
        
        if (keywords.length > 0) {
            summary += "**Keywords:** " + keywords.join(", ") + "\n\n";
        }
        
        summary += `**Original length:** ${words.length} words\n`;
        summary += `**Summary length:** ${keyPoints.length} key points\n\n`;
        summary += "_Summarized by NaijaSmart AI_";

        return summary;
    }

    displaySummary(summary) {
        const summaryOutput = document.getElementById('summaryOutput');
        const summaryContent = document.getElementById('summaryContent');
        
        // Convert markdown-like formatting to HTML
        let htmlSummary = summary
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
        
        summaryContent.innerHTML = htmlSummary;
        summaryOutput.style.display = 'block';
        summaryOutput.scrollIntoView({ behavior: 'smooth' });
    }

    copySummary() {
        const summaryContent = document.getElementById('summaryContent');
        const text = summaryContent.textContent || summaryContent.innerText;
        
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Summary copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast('Summary copied to clipboard!');
        });
    }

    downloadSummary() {
        const summaryContent = document.getElementById('summaryContent');
        if (!summaryContent.textContent) {
            alert('No summary to download!');
            return;
        }
        
        const text = summaryContent.textContent || summaryContent.innerText;
        const content = `NaijaSmart - Notes Summary\n========================\n\n${text}\n\nGenerated by NaijaSmart AI Productivity Suite\nBuilt by Abdulrahman Adisa Amuda for #3MTT Showcase`;
        
        this.downloadFile(content, 'naijasmart-summary.txt');
    }

    // Tasks Functionality
    generateTasks() {
        const goalInput = document.getElementById('goalInput');
        const goal = goalInput.value.trim();
        
        if (!goal) {
            alert('Please enter your goal or project!');
            return;
        }

        this.showLoading('Generating your action plan...');

        setTimeout(() => {
            this.hideLoading();
            const tasks = this.generateTasksForGoal(goal);
            this.displayTasks(tasks, goal);
            localStorage.setItem('naijasmart-last-tasks', JSON.stringify({ goal, tasks }));
        }, 2500);
    }

    generateTasksForGoal(goal) {
        const goalLower = goal.toLowerCase();
        let tasks = [];

        // Determine category based on keywords
        if (goalLower.includes('business') || goalLower.includes('startup') || goalLower.includes('company')) {
            tasks = [...this.taskTemplates.business];
        } else if (goalLower.includes('study') || goalLower.includes('exam') || goalLower.includes('school') || goalLower.includes('learn')) {
            tasks = [...this.taskTemplates.study];
        } else if (goalLower.includes('youtube') || goalLower.includes('channel') || goalLower.includes('video')) {
            tasks = [...this.taskTemplates.youtube];
        } else if (goalLower.includes('programming') || goalLower.includes('coding') || goalLower.includes('software') || goalLower.includes('app') || goalLower.includes('website')) {
            tasks = [...this.taskTemplates.tech];
        } else if (goalLower.includes('freelance') || goalLower.includes('hustle') || goalLower.includes('side')) {
            tasks = [...this.taskTemplates.hustle];
        } else {
            tasks = [...this.taskTemplates.personal];
        }

        // Add goal-specific customization
        if (goalLower.includes('online') && !tasks.some(t => t.includes('online'))) {
            tasks.unshift('Research online opportunities and platforms in your field');
        }
        
        if (goalLower.includes('money') || goalLower.includes('income')) {
            tasks.push('Set up multiple income streams for financial security');
        }

        return tasks.slice(0, 7); // Limit to 7 tasks
    }

    displayTasks(tasks, goal) {
        const tasksOutput = document.getElementById('tasksOutput');
        const tasksList = document.getElementById('tasksList');
        
        let html = `<p><strong>Goal:</strong> ${goal}</p><br>`;
        
        tasks.forEach((task, index) => {
            html += `
                <div class="task-item">
                    <span class="task-number">${index + 1}</span>
                    <input type="text" class="task-text" value="${task}" data-index="${index}">
                </div>
            `;
        });
        
        tasksList.innerHTML = html;
        tasksOutput.style.display = 'block';
        tasksOutput.scrollIntoView({ behavior: 'smooth' });

        // Make tasks editable
        tasksList.querySelectorAll('.task-text').forEach(input => {
            input.addEventListener('input', (e) => {
                tasks[e.target.dataset.index] = e.target.value;
                localStorage.setItem('naijasmart-last-tasks', JSON.stringify({ goal, tasks }));
            });
        });
    }

    downloadTasks() {
        const tasksList = document.getElementById('tasksList');
        if (!tasksList.innerHTML) {
            alert('No tasks to download!');
            return;
        }

        const goalElement = tasksList.querySelector('p strong');
        const goal = goalElement ? goalElement.parentElement.textContent.replace('Goal: ', '') : 'My Goal';
        
        let content = `NaijaSmart - Action Plan\n========================\n\n`;
        content += `Goal: ${goal}\n\n`;
        content += `Action Steps:\n`;
        
        const taskInputs = tasksList.querySelectorAll('.task-text');
        taskInputs.forEach((input, index) => {
            content += `${index + 1}. ${input.value}\n`;
        });
        
        content += `\n\nGenerated by NaijaSmart AI Productivity Suite\n`;
        content += `Built by Abdulrahman Adisa Amuda for #3MTT Showcase`;
        
        this.downloadFile(content, 'naijasmart-action-plan.txt');
    }

    // Quotes Functionality
    generateNewQuote() {
        const quoteText = document.getElementById('quoteText');
        
        // Cycle through quotes
        this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
        const newQuote = this.quotes[this.currentQuoteIndex];
        
        // Add animation
        quoteText.style.opacity = '0';
        setTimeout(() => {
            quoteText.textContent = newQuote;
            quoteText.style.opacity = '1';
        }, 200);
    }

    copyQuote() {
        const quoteText = document.getElementById('quoteText').textContent;
        
        navigator.clipboard.writeText(quoteText).then(() => {
            this.showToast('Quote copied to clipboard!');
        }).catch(() => {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = quoteText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast('Quote copied to clipboard!');
        });
    }

    shareQuote() {
        const quoteText = document.getElementById('quoteText').textContent;
        const tweetText = encodeURIComponent(`${quoteText}\n\n#NaijaSmart #Motivation #3MTT`);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
        
        window.open(twitterUrl, '_blank');
    }

    // Utility Functions
    showLoading(text = 'Loading...') {
        const overlay = document.getElementById('loadingOverlay');
        const loadingText = document.getElementById('loadingText');
        
        loadingText.textContent = text;
        overlay.classList.add('active');
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.remove('active');
    }

    showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: hsl(133 100% 25%);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1001;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                document.body.removeChild(toast);
                document.head.removeChild(style);
            }, 300);
        }, 3000);
    }

    formatTime(date) {
        // Ensure date is a Date object
        if (typeof date === 'string') {
            date = new Date(date);
        }
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            date = new Date();
        }
        
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }

    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showToast('File downloaded successfully!');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new NaijaSmart();
});

// Service worker registration for offline capability
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
