/* eslint-disable jsx-a11y/anchor-is-valid */

const Breadcrumb = () => {
    return (
        <div className="content-header justify-content-between">
            <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Pages</a></li>
                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li className="breadcrumb-item active" aria-current="page">Projects &amp; Web Services</li>
                </ol>
            </nav>
            <h4 className="content-title content-title-xs">Welcome to Dashboard</h4>
            </div>
        </div>
    )
}

export default Breadcrumb
