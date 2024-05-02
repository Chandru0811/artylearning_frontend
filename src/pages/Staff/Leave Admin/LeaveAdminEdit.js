import React from 'react';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

function LeaveAdminEdit() {

    const validationSchema = Yup.object({
        centreName: Yup.string().required('*Select a Centre Name'),
        employeeName: Yup.string().required('*Employee Name is required'),
        leaveType: Yup.string().required('*Select a Leave Type'),
        noOfDays: Yup.string().required('*No.Of.Days is required'),
        fromDate: Yup.string().required('*From Date is required'),
        toDate: Yup.string().required('*To Date is required'),
        dayType: Yup.string().required('*Day Type is required'),
        approverName: Yup.string().required('*Approver Name is required'),
        status: Yup.string().required('*Select a Status'),
        leaveReason: Yup.string().required('*Leave Reason is required')
    });

    const formik = useFormik({
        initialValues: {
            centreName: 'Arty Learning @ Hougang',
            employeeName: 'Sathish',
            leaveType: 'Sick Leave',
            noOfDays: '02',
            fromDate: '2024-04-30',
            toDate: '2024-05-01',
            dayType: 'Full Day',
            attachment: '',
            approverName: 'Manoj',
            status: 'Pending',
            leaveReason: 'Fever'
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        },
    });

    return (
        <section>
            <div className='container'>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row my-3 mb-5">
                        <div className="col-12 text-end">
                            <Link to="/leaveadmin">
                                <button type="button" className="btn btn-sm btn-border">Back</button>
                            </Link>
                            &nbsp;&nbsp;
                            <button type="submit" className="btn btn-sm btn-button">Update</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-12 mb-3'>
                            <label className='form-label'>Centre Name<span className='text-danger'>*</span></label>
                            <select className={`form-select  ${formik.touched.centreName && formik.errors.centreName ? 'is-invalid' : ''}`}
                                {...formik.getFieldProps('centreName')} >
                                <option selected></option>
                                <option value='Arty Learning @ Hougang'>Arty Learning @ Hougang</option>
                                <option value='Arty Learning @ Ang Mo Kio'>Arty Learning @ Ang Mo Kio</option>
                                <option value='Arty Learning @ Butik Batok'>Arty Learning @ Butik Batok</option>
                            </select>
                            {formik.touched.centreName && formik.errors.centreName && (
                                <div className="invalid-feedback">{formik.errors.centreName}</div>
                            )}
                        </div>
                        <div className='col-md-6 col-12 mb-3'>
                            <label className='form-label'>Employee Name<span className='text-danger'>*</span></label>
                            <input
                                type='text'
                                className={`form-control  ${formik.touched.employeeName && formik.errors.employeeName ? 'is-invalid' : ''}`}
                                {...formik.getFieldProps('employeeName')}
                            />
                            {formik.touched.employeeName && formik.errors.employeeName && (
                                <div className="invalid-feedback">{formik.errors.employeeName}</div>
                            )}
                        </div>
                        <div className='col-md-6 col-12 mb-3'>
                            <label>Leave Type<span className='text-danger'>*</span></label>
                            <select className={`form-select  ${formik.touched.leaveType && formik.errors.leaveType ? 'is-invalid' : ''}`}
                                {...formik.getFieldProps('leaveType')} >
                                <option selected></option>
                                <option value='Sick Leave'>Sick Leave</option>
                                <option value='Casual Leave'>Casual Leave</option>
                                <option value='Privilege Leave'>Privilege Leave</option>
                            </select>
                            {formik.touched.leaveType && formik.errors.leaveType && (
                                <div className="invalid-feedback">{formik.errors.leaveType}</div>
                            )}
                        </div>
                        <div className='col-md-6 col-12 mb-3'>
                            <label className='form-label'>No.Of.Days<span className='text-danger'>*</span></label>
                            <input
                                type='text'
                                className={`form-control  ${formik.touched.noOfDays && formik.errors.noOfDays ? 'is-invalid' : ''}`}
                                {...formik.getFieldProps('noOfDays')}
                            />
                            {formik.touched.noOfDays && formik.errors.noOfDays && (
                                <div className="invalid-feedback">{formik.errors.noOfDays}</div>
                            )}
                        </div>
                        <div className='col-md-6 col-12 mb-3'>
                            <label className='form-label'>From Date<span className='text-danger'>*</span></label>
                            <input
                                type='date'
                                className={`form-control  ${formik.touched.fromDate && formik.errors.fromDate ? 'is-invalid' : ''}`}
                                {...formik.getFieldProps('fromDate')}
                            />
                            {formik.touched.fromDate && formik.errors.fromDate && (
                                <div className="invalid-feedback">{formik.errors.fromDate}</div>
                            )}
                        </div>
                        <div className='col-md-6 col-12 mb-3'>
                            <label className='form-label'>To Date<span className='text-danger'>*</span></label>
                            <input
                                type='date'
                                className={`form-control  ${formik.touched.toDate && formik.errors.toDate ? 'is-invalid' : ''}`}
                                {...formik.getFieldProps('toDate')}
                            />
                            {formik.touched.toDate && formik.errors.toDate && (
                                <div className="invalid-feedback">{formik.errors.toDate}</div>
                            )}
                        </div>
                        <div className='col-md-6 col-12 mb-3'>
                            <label className='form-label'>Day Type<span className='text-danger'>*</span></label>
                            <input
                                type='text'
                                className={`form-control  ${formik.touched.dayType && formik.errors.dayType ? 'is-invalid' : ''}`}
                                {...formik.getFieldProps('dayType')}
                            />
                            {formik.touched.dayType && formik.errors.dayType && (
                                <div className="invalid-feedback">{formik.errors.dayType}</div>
                            )}
                        </div>
                        <div className='col-md-6 col-12 mb-3'>
                            <label className='form-label'>Attachment</label>
                            <input
                                type='file'
                                className='form-control'
                                {...formik.getFieldProps('attachment')} />
                        </div>
                        <div className='col-md-6 col-12 mb-3'>
                            <label className='form-label'>Approver Name<span className='text-danger'>*</span></label>
                            <input
                                type='text'
                                className={`form-control  ${formik.touched.approverName && formik.errors.approverName ? 'is-invalid' : ''}`}
                                {...formik.getFieldProps('approverName')}
                            />
                            {formik.touched.approverName && formik.errors.approverName && (
                                <div className="invalid-feedback">{formik.errors.approverName}</div>
                            )}
                        </div>
                        <div className='col-md-6 col-12 mb-3'>
                            <label className='form-label'>Status<span className='text-danger'>*</span></label>
                            <select className={`form-select  ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`}
                                {...formik.getFieldProps('status')}>
                                <option value='Pending'>Pending</option>
                                <option value='Approved'>Approved</option>
                                <option value='Rejected'>Rejected</option>
                            </select>
                            {formik.touched.status && formik.errors.status && (
                                <div className="invalid-feedback">{formik.errors.status}</div>
                            )}
                        </div>
                        <div className='col-md-6 col-12 mb-3'>
                            <label className='form-label'>Leave Reason<span className='text-danger'>*</span></label>
                            <textarea rows={5}
                                className={`form-control  ${formik.touched.leaveReason && formik.errors.leaveReason ? 'is-invalid' : ''}`}
                                {...formik.getFieldProps('leaveReason')}></textarea>
                            {formik.touched.leaveReason && formik.errors.leaveReason && (
                                <div className="invalid-feedback">{formik.errors.leaveReason}</div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default LeaveAdminEdit;