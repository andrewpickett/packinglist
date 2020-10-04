import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FaEdit, FaRegWindowClose} from 'react-icons/fa';
import EmptyDiv from '../Layout/EmptyDiv';

export default function ListRow(props) {
	const urlBase = props.isSample ? '/samples/' : '/lists/';
	return (
		<Row className="p-2 border-bottom border-left border-right">
			<Col className="text-left">
				<Link to={urlBase + props.list.id}>{props.list.name}</Link>
			</Col>
			<Col className="col-2 text-right">
				{props.isSample ? <EmptyDiv /> : <div>
					<span className="px-2"><Link to={urlBase + props.list.id + '/edit'}><FaEdit color={"green"} /></Link></span>
					<span className="px-2"><Link to={urlBase} onClick={(e) => props.onDelete(e, props.list.id)}><FaRegWindowClose color={"red"}/></Link></span>
				</div>}
			</Col>
		</Row>
	);
}
