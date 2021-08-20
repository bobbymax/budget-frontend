/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { connect } from 'react-redux'
import {destroy, index, store, update} from '../../redux/actions'
import * as broadcast from '../../redux/accessControl/types'
import {
    Row
} from 'react-bootstrap'
import DashboardModuleWidget from "../widgets/DashboardModuleWidget"


const Dashboard = (props) => {

    const auth = useSelector(state => state.access.staff.authenticatedUser)

    useEffect(() => {
        props.index('modules', {
            success: broadcast.FETCH_MODULES,
            failed: broadcast.FETCH_MODULES_FAILED
        })
    }, [])

    return (
        <>
            <h4  className="content-title content-title-xs mb-5">Welcome back - {auth.name}</h4>
            <div className="card-section">
                <Row>
                    {props.modules.collection.length !== 0 ? props.modules.collection.map(module => {
                        if (module.parentId === 0) {
                            return (
                                <DashboardModuleWidget
                                    auth={auth}
                                    key={module.id}
                                    module={module}
                                />
                            )
                        } else {
                            return null
                        }
                    }) : null}
                </Row>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        modules: state.access.modules
    }
}

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, body, broadcast) => dispatch(store(entity, body, broadcast)),
        update: (entity, id, body, broadcast) => dispatch(update(entity, id, body, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Dashboard)