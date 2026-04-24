import React from 'react'

const inc = 
  [
  { "id": 1, "ingredient": "Chicken Breast", "icon": "🍗" },
  { "id": 2, "ingredient": "Tomato", "icon": "🍅" },
  { "id": 3, "ingredient": "Spinach", "icon": "🍃" },
  { "id": 4, "ingredient": "Pasta", "icon": "🍝" },
  { "id": 5, "ingredient": "Salmon", "icon": "🐟" },
  { "id": 6, "ingredient": "Garlic", "icon": "🧄" },
  { "id": 7, "ingredient": "Mushrooms", "icon": "🍄" },
  { "id": 8, "ingredient": "Cheese", "icon": "🧀" },
  { "id": 9, "ingredient": "Onion", "icon": "🧅" },
  { "id": 10, "ingredient": "Potato", "icon": "🥔" },
  { "id": 11, "ingredient": "Egg", "icon": "🥚" },
  { "id": 12, "ingredient": "Broccoli", "icon": "🥦" },
  { "id": 13, "ingredient": "Avocado", "icon": "🥑" },
  { "id": 14, "ingredient": "Beef", "icon": "🥩" },
  { "id": 15, "ingredient": "Shrimp", "icon": "🍤" },
  { "id": 16, "ingredient": "Rice", "icon": "🍚" },
  { "id": 17, "ingredient": "Carrot", "icon": "🥕" },
  { "id": 18, "ingredient": "Bell Pepper", "icon": "🫑" },
  { "id": 19, "ingredient": "Tofu", "icon": "🧊" },
  { "id": 20, "ingredient": "Lemon", "icon": "🍋" }
]


const App = () => {
  return (
    <>
    <nav className="glass-nav">
    <div className="nav-content">
        <div className="nav-logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">Culinara<span>AI</span></span>
        </div>
        <ul className="nav-links">
            <li><a href="#" className="active">Dashboard</a></li>
            <li><a href="#">Cookbook</a></li>
            <li><a href="#">My Fridge</a></li>
        </ul>
        <div className="nav-auth">
            <button className="btn-login">Login</button>
            <button className="btn-signup">Get Started</button>
        </div>
    </div>
</nav>
    <div className="blob-bg"></div>

    <main className="glass-container" id="app-container">
        <section id="page-input">
            <header>
                <span className="badge">AI Recipe Engine</span>
                <h1>What's in your <span>kitchen?</span></h1>
                <p>Select your ingredients and our AI will craft the perfect dish.</p>
            </header>

            <div className="ingredient-grid">
              {
                inc.map(item=><label className="chip">
                    <input type="checkbox" value="Tomato"/>
                    <span>{item.icon} {item.ingredient}</span>
                </label>)
              }
                
               
            </div>

            <button className="generate-btn" onclick="generateRecipe()">
                Generate Magic ✨
            </button>
        </section>

        <section id="page-result" className="hidden">
            <button className="back-btn" onclick="showInput()">← Back to Pantry</button>
            <div className="recipe-card">
                <div className="recipe-header">
                    <h2 id="recipe-title">Gourmet Creation</h2>
                    <div className="meta">
                        <span>⏱ 25 Mins</span>
                        <span>🔥 High Protein</span>
                    </div>
                </div>
                <hr/>
                <div className="recipe-body">
                    <h3>Instructions</h3>
                    <p id="recipe-text">Calculating the best flavor combinations...</p>
                </div>
            </div>
        </section>
    </main>

    
    </>
  )
}

export default App