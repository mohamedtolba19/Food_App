// import React, { useEffect, useState } from 'react'
import Header from '../../../SharedComponents/Components/Header/Header.jsx'
import logo from "../../../../assets/images/categoryImg.png"
import noData from "../../../../assets/images/no-data.png"
import ActionCell from '../../../SharedComponents/Components/ActionCell/ActionCell.jsx'
import NoData from '../../../SharedComponents/Components/NoData/NoData.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import { deleteUser, getUsers } from '../../../../api/modules/users.js'
import { Pagination } from 'react-bootstrap'
import { useState , useEffect } from 'react';

export default function UsersList() {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  const [page, setPage] = useState(1);
  const [numberOfTotalPages, setNumberOfTotalPages] = useState(1);

  const pageSize = 10;
  const maxVisible = 5;

  const emptyFilters = { userName: "", country: "", email: "", groups: "" };
  const [filters, setFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState({});

  async function getList(pageNumber = page, currentFilters = appliedFilters) {
    try {
      const response = await getUsers({ ...currentFilters, pageSize, pageNumber });
      setList(response.data.data);
      setNumberOfTotalPages(response.data.totalNumberOfPages);
    } catch (error) {
      console.log(error);
    }
  }

  // single fetch effect: runs on mount and whenever page or filters change
  useEffect(() => {
    getList(page, appliedFilters);
  }, [page, appliedFilters]);

  function handleChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    setAppliedFilters(filters);
  }

  function handleReset() {
    setFilters(emptyFilters);
    setPage(1);
    setAppliedFilters(emptyFilters);
  }

  function setUser(item) {
    setItem(item);
  }

  async function deleteItem(id) {
    if (item.group.name == "SuperAdmin") {
      toast.error("Can't delete super admin");
      return;
    }
    try {
      await deleteUser(id);
      setShow(false);
      getList(page, appliedFilters);
      toast.success(`Successfully deleted ${item.userName}`);
    } catch (error) {
      toast.error(error.message);
    }
  }

  // ---- sliding window of page numbers (max 5) ----
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > numberOfTotalPages) {
    end = numberOfTotalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  const visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return <>
    <div className="users-container">
      <div className="header-container">
        <Header title="Users List" desc="You can now add your items that any user can order it from the Application and you can edit" imgUrl={logo} />
      </div>

      <div className="delete-model">
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton className='border-0'></Modal.Header>
          <Modal.Body className='text-center p-3'>
            <img src={noData} alt="" />
            <h5 className='pt-2'>Delete This user ?</h5>
            <p>are you sure you want to delete {item?.userName} ? if you are sure just click on delete it</p>
          </Modal.Body>
          <Modal.Footer className='border-0'>
            <Button variant="outline-danger" onClick={() => deleteItem(item?.id)}>
              Delete this item
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="info-container d-flex justify-content-between align-items-center px-4 py-3">
        <div>
          <h3>Users Table Details</h3>
          <span>You can check all details</span>
        </div>
      </div>

      <div className="table-container px-4 py-3 table-responsive">
        {list ?
          <div>
            <form onSubmit={handleSearch} className="row g-2 py-3">
              <div className="col-md-2">
                <input className="form-control" name="userName" placeholder="Search by name"
                  value={filters.userName} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <input className="form-control" name="country" placeholder="Search by country"
                  value={filters.country} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <input className="form-control" name="email" placeholder="Search by email"
                  value={filters.email} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <select className="form-select" name="groups"
                  value={filters.groups} onChange={handleChange}>
                  <option value="">All roles</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </select>
              </div>
              <div className="col-md-1 d-flex gap-2">
                <button type="submit" className="btn btn-success">Search</button>
                <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>Reset</button>
              </div>
            </form>

            <table className="table table-hover">
              <thead className='table-light text-uppercase small'>
                <tr className='table-light p-5'>
                  <th className='py-3 fw-light'>Id</th>
                  <th className='py-3 fw-light'>Name</th>
                  <th className='py-3 fw-light'>Country</th>
                  <th className='py-3 fw-light'>Email</th>
                  <th className='py-3 fw-light'>PhoneNumber</th>
                  <th className='py-3 fw-light'>Role</th>
                  <th className='py-3 fw-light'>Creation Date</th>
                  <th className='py-3 fw-light'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((user) => (
                  <tr key={user.id}>
                    <td className='py-3' scope="row">{user.id}</td>
                    <td className='py-3' scope="row">{user.userName}</td>
                    <td className='py-3' scope="row">{user.country}</td>
                    <td className='py-3' scope="row">{user.email}</td>
                    <td className='py-3' scope="row">{user.phoneNumber}</td>
                    <td className='py-3' scope="row">{user.group.name}</td>
                    <td>{user.creationDate}</td>
                    <ActionCell setShow={setShow} setItem={setUser} item={user} type="users" />
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination className="justify-content-center custom-pagination">
              <Pagination.Prev
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              />

              {start > 1 && <Pagination.Ellipsis disabled />}

              {visiblePages.map((p) => (
                <Pagination.Item
                  key={p}
                  active={page === p}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Pagination.Item>
              ))}

              {end < numberOfTotalPages && <Pagination.Ellipsis disabled />}

              <Pagination.Next
                disabled={page === numberOfTotalPages}
                onClick={() => setPage(page + 1)}
              />
            </Pagination>
          </div>
          : <NoData />}
      </div>
    </div>
  </>
}