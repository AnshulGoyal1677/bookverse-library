{/* Genre Exploration (Category Section) */}
<section style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}>
    <div style={{ marginBottom: "32px", textAlign: "left" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#030612", margin: "0 0 6px" }}>
            Explore by Category
        </h2>
        <p style={{ color: "#45464c", margin: 0, fontSize: "16px" }}>
            Delve into specific realms of knowledge and imagination.
        </p>
    </div>

    {/* Responsive Category Grid */}
    <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "24px"
    }}>
        {/* Fiction Card */}
        <div style={{
            backgroundColor: "#1a1f2c",
            color: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            minHeight: "160px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{ margin: "0 0 6px", fontSize: "22px" }}>Fiction</h3>
            <p style={{ margin: 0, fontSize: "14px", opacity: 0.85 }}>
                Novels, short stories, and tales of imagination.
            </p>
        </div>

        {/* Non-Fiction Card */}
        <div style={{
            backgroundColor: "#7d562d",
            color: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            minHeight: "160px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{ margin: "0 0 6px", fontSize: "22px" }}>Non-Fiction</h3>
            <p style={{ margin: 0, fontSize: "14px", opacity: 0.85 }}>
                Real-world insights, philosophies, and essays.
            </p>
        </div>

        {/* Poetry Card */}
        <div style={{
            backgroundColor: "#45464c",
            color: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            minHeight: "160px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{ margin: "0 0 6px", fontSize: "22px" }}>Poetry</h3>
            <p style={{ margin: 0, fontSize: "14px", opacity: 0.85 }}>
                Verses, rhymes, and lyrical compositions.
            </p>
        </div>

        {/* History Card */}
        <div style={{
            backgroundColor: "#eceef2",
            color: "#030612",
            padding: "24px",
            borderRadius: "16px",
            minHeight: "160px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{ margin: "0 0 6px", fontSize: "22px" }}>History</h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#45464c" }}>
                Chronicles of the past, biographies, and historical events.
            </p>
        </div>
    </div>
</section>
