     // DOM Elements
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.querySelector('.nav-links');
        const themeToggle = document.getElementById('themeToggle');
        const techTabs = document.querySelectorAll('.tech-tab');
        const techContents = document.querySelectorAll('.tech-content');
        const calculateBtn = document.getElementById('calculateBtn');
        const salaryResult = document.getElementById('salaryResult');
        const quizSubmit = document.getElementById('quizSubmit');
        const quizResult = document.getElementById('quizResult');
        const runCodeBtn = document.getElementById('runCode');
        const todoInput = document.getElementById('todoInput');
        const addTodoBtn = document.getElementById('addTodoBtn');
        const todoList = document.getElementById('todoList');
        const courseSearch = document.getElementById('courseSearch');
        const courseFilter = document.getElementById('courseFilter');
        const addCourseBtn = document.getElementById('addCourseBtn');
        const courseTableBody = document.getElementById('courseTableBody');
        const contactForm = document.getElementById('contactForm');
        const testimonialsContainer = document.getElementById('testimonialsContainer');

        // Sample course data
        const courses = [
            { name: 'HTML/CSS Fundamentals', difficulty: 'beginner', duration: '4 weeks', salary: '$60k-$80k' },
            { name: 'JavaScript Deep Dive', difficulty: 'intermediate', duration: '6 weeks', salary: '$80k-$120k' },
            { name: 'React Masterclass', difficulty: 'intermediate', duration: '8 weeks', salary: '$90k-$140k' },
            { name: 'Advanced TypeScript', difficulty: 'advanced', duration: '5 weeks', salary: '$100k-$160k' },
            { name: 'Frontend Performance', difficulty: 'advanced', duration: '4 weeks', salary: '$110k-$170k' }
        ];

        // Initialize the page
        function init() {
            // Load theme preference
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            
            // Load todos from localStorage
            loadTodos();
            
            // Render courses table
            renderCourses();
            
            // Fetch testimonials from API
            fetchTestimonials();
        }

        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Theme toggle
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Tech tabs functionality
        techTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                techTabs.forEach(t => t.classList.remove('active'));
                techContents.forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Salary calculator
        calculateBtn.addEventListener('click', () => {
            const experience = document.getElementById('experience').value;
            const location = document.getElementById('location').value;
            
            let salary = '';
            
            if (location === 'us') {
                if (experience === '0-1') salary = '$60,000 - $80,000';
                else if (experience === '2-4') salary = '$80,000 - $120,000';
                else salary = '$120,000 - $180,000';
            } else if (location === 'uk') {
                if (experience === '0-1') salary = '£30,000 - £45,000';
                else if (experience === '2-4') salary = '£45,000 - £70,000';
                else salary = '£70,000 - £100,000';
            } else if (location === 'eu') {
                if (experience === '0-1') salary = '€40,000 - €60,000';
                else if (experience === '2-4') salary = '€60,000 - €90,000';
                else salary = '€90,000 - €130,000';
            } else if (location === 'india') {
                if (experience === '0-1') salary = '₹6,00,000 - ₹10,00,000';
                else if (experience === '2-4') salary = '₹10,00,000 - ₹20,00,000';
                else salary = '₹20,00,000 - ₹35,00,000';
            } else { // remote
                if (experience === '0-1') salary = '$50,000 - $70,000';
                else if (experience === '2-4') salary = '$70,000 - $100,000';
                else salary = '$100,000 - $150,000';
            }
            
            salaryResult.textContent = `Estimated Salary: ${salary}`;
            salaryResult.style.display = 'block';
        });

        // Tech quiz
        quizSubmit.addEventListener('click', () => {
            const selectedOption = document.querySelector('input[name="quiz"]:checked');
            
            if (!selectedOption) {
                quizResult.textContent = 'Please select an option';
                quizResult.style.display = 'block';
                return;
            }
            
            let result = '';
            const value = selectedOption.value;
            
            if (value === 'react') {
                result = 'React would be a great fit for you with its vast ecosystem and community support!';
            } else if (value === 'vue') {
                result = 'Vue.js might be your perfect match with its gentle learning curve and great documentation!';
            } else {
                result = 'You should try Svelte for its simplicity and minimal boilerplate!';
            }
            
            quizResult.textContent = result;
            quizResult.style.display = 'block';
        });

     

        // To-do list functionality
        function loadTodos() {
            const todos = JSON.parse(localStorage.getItem('frontendTodos')) || [];
            
            todoList.innerHTML = '';
            
            todos.forEach((todo, index) => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <span>${todo.text}</span>
                    <div class="todo-actions">
                        <button class="todo-btn complete" data-index="${index}">✓</button>
                        <button class="todo-btn delete" data-index="${index}">✕</button>
                    </div>
                `;
                todoList.appendChild(li);
            });
            
            // Add event listeners to new buttons
            document.querySelectorAll('.complete').forEach(btn => {
                btn.addEventListener('click', toggleTodo);
            });
            
            document.querySelectorAll('.delete').forEach(btn => {
                btn.addEventListener('click', deleteTodo);
            });
        }

        function addTodo() {
            const text = todoInput.value.trim();
            
            if (text) {
                const todos = JSON.parse(localStorage.getItem('frontendTodos')) || [];
                todos.push({ text, completed: false });
                localStorage.setItem('frontendTodos', JSON.stringify(todos));
                todoInput.value = '';
                loadTodos();
            }
        }

        function toggleTodo(e) {
            const index = e.target.getAttribute('data-index');
            const todos = JSON.parse(localStorage.getItem('frontendTodos'));
            todos[index].completed = !todos[index].completed;
            localStorage.setItem('frontendTodos', JSON.stringify(todos));
            loadTodos();
        }

        function deleteTodo(e) {
            const index = e.target.getAttribute('data-index');
            const todos = JSON.parse(localStorage.getItem('frontendTodos'));
            todos.splice(index, 1);
            localStorage.setItem('frontendTodos', JSON.stringify(todos));
            loadTodos();
        }

        addTodoBtn.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });

        // Courses functionality
        function renderCourses(filteredCourses = courses) {
            courseTableBody.innerHTML = '';
            
            filteredCourses.forEach((course, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${course.name}</td>
                    <td><span class="difficulty ${course.difficulty}">${course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}</span></td>
                    <td>${course.duration}</td>
                    <td>${course.salary}</td>
                    <td><button class="todo-btn delete" data-index="${index}">✕</button></td>
                `;
                courseTableBody.appendChild(tr);
            });
            
            // Add event listeners to delete buttons
            document.querySelectorAll('#courseTableBody .delete').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = e.target.getAttribute('data-index');
                    courses.splice(index, 1);
                    renderCourses();
                });
            });
        }

        function filterCourses() {
            const searchTerm = courseSearch.value.toLowerCase();
            const filterValue = courseFilter.value;
            
            let filtered = courses.filter(course => 
                course.name.toLowerCase().includes(searchTerm)
            );
            
            if (filterValue !== 'all') {
                filtered = filtered.filter(course => course.difficulty === filterValue);
            }
            
            renderCourses(filtered);
        }

        courseSearch.addEventListener('input', filterCourses);
        courseFilter.addEventListener('change', filterCourses);

        addCourseBtn.addEventListener('click', () => {
            const name = prompt('Enter course name:');
            if (name) {
                const difficulty = prompt('Enter difficulty (beginner/intermediate/advanced):');
                const duration = prompt('Enter duration (e.g., "4 weeks"):');
                const salary = prompt('Enter salary potential (e.g., "$60k-$80k"):');
                
                if (name && difficulty && duration && salary) {
                    courses.push({ name, difficulty, duration, salary });
                    renderCourses();
                }
            }
        });

        // Contact form
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });

        // Fetch testimonials from API
        async function fetchTestimonials() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
                const comments = await response.json();
                
                testimonialsContainer.innerHTML = '';
                
                comments.forEach(comment => {
                    const card = document.createElement('div');
                    card.className = 'testimonial-card';
                    card.innerHTML = `
                        <div class="testimonial-content">${comment.body}</div>
                        <div class="testimonial-author">
                            <div class="testimonial-avatar">
                                <img src="https://i.pravatar.cc/100?img=${comment.id}" alt="${comment.name}">
                            </div>
                            <div class="author-info">
                                <h4>${comment.name}</h4>
                                <p>Frontend Developer</p>
                            </div>
                        </div>
                    `;
                    testimonialsContainer.appendChild(card);
                });
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                testimonialsContainer.innerHTML = '<p>Failed to load testimonials. Please try again later.</p>';
            }
        }

        // Initialize the page
        init();