/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
    Row
} from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'
import {fetch} from '../../redux/actions'
import * as broadcast from '../../redux/accessControl/types'
import PageCard from '../widgets/PageCard'

const Pages = props => {

    const param = props.match.params.id
    const auth = useSelector(state => state.access.staff.authenticatedUser)

    useEffect(() => {
        if (param) {
            props.fetch('modules', param, {
                success: broadcast.FETCH_MODULE_RECORD,
                failed: broadcast.FETCH_MODULE_RECORD_FAILED
            })
        }
    }, [param])

    return (
        <>
            <h4 className="mb-5">Pages</h4>
            <div className="card-section">
                <Row>
                    {props.module && props.module.children.length !== 0 ? props.module.children.map(child => {
                            return (
                                <PageCard
                                    auth={auth}
                                    key={child.id}
                                    module={child}
                                    parent={param}
                                />
                            )
                    }) : null}
                </Row>
            </div> 
        </>
    )
}

const mapStateToProps = state => ({
    module: state.access.modules.module
})

const mapDispatchToProps = dispatch => {
    return {
        fetch: (entity, id, broadcast) => dispatch(fetch(entity, id, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Pages)

