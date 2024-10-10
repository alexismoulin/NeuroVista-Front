export default function Header({styles}) {
    return (
        <section id={styles.header} className={styles.dark}>
            <header>
                    <h1 style={{fontSize: "5rem"}}>Welcome to NeuroVista</h1>
                    <p>An innovation platform for processing, analyzing, and visualizing human brain MR images</p>
            </header>
        </section>
    )
}