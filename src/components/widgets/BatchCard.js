
const BatchCard = ({batch, onRemove}) => {
    return (
        <div className="card card-hover card-social-one">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mg-b-10">
                <h1 className="card-value">{new Intl.NumberFormat().format(batch.amount)}</h1>
                <div className="chart-wrapper">
                    <p
                        style={{ cursor: 'pointer', fontSize: 13 }}
                        onClick={() => onRemove(batch)}
                        className="text-danger"
                    >- remove</p>
                </div>
                </div>
                <h5 className="card-title tx-primary">{batch.beneficiary}</h5>
                <p className="card-desc">{batch.description}</p>
            </div>
        </div>
    )
}

export default BatchCard
