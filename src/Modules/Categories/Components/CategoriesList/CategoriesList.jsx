// import React, { useEffect, useState } from 'react'
import Header from '../../../SharedComponents/Components/Header/Header.jsx'
import logo from "../../../../assets/images/categoryImg.png"
import noData from "../../../../assets/images/no-data.png"
import ActionCell from '../../../SharedComponents/Components/ActionCell/ActionCell.jsx'
import { addCategory, deleteCategory, getCategories, updateCategory } from '../../../../api/modules/categories.js';
import NoData from '../../../SharedComponents/Components/NoData/NoData.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Pagination } from 'react-bootstrap'
import { useState , useEffect } from 'react';

export default function CategoriesList() {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [numberOfTotalPages, setNumberOfTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");

  const pageSize = 5;
  const maxVisible = 5;

  // Form for ADD
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
  } = useForm();

  // Form for EDIT
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm();

  async function getList(pageNumber = page, name = searchName) {
    try {
      const response = await getCategories(pageNumber, pageSize, name);
      setList(response.data.data);
      setNumberOfTotalPages(response.data.totalNumberOfPages);
    } catch (error) {
      console.log(error);
    }
  }

  // single fetch effect: mount + page/search changes
  useEffect(() => {
    getList(page, searchName);
  }, [page, searchName]);

  // fill the edit form when an item is selected
  useEffect(() => {
    if (item) {
      resetEdit({ name: item.name });
    }
  }, [item, resetEdit]);

  async function onSubmit(data) {
    try {
      await addCategory(data);
      getList(page, searchName);
      setShowAdd(false);
      resetAdd();
      toast.success(`Successfully added ${data.name}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function onUpdateSubmit(data) {
    try {
      setIsLoading(true);
      await updateCategory(data, item?.id);
      setShowEdit(false);
      getList(page, searchName);
      toast.success("Successfully updated");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteItem(id) {
    try {
      setIsLoading(true);
      await deleteCategory(id);
      setShow(false);
      getList(page, searchName);
      toast.success(`Successfully deleted ${item.name}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function setCategory(item) {
    setItem(item);
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
    <div className="categories-container">

      <Header title="Categories Item" desc="You can now add your items that any user can order it from the Application and you can edit" imgUrl={logo} />

      {/* Add modal */}
      <div className="add-model">
        <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
          <Modal.Header closeButton className='border-0'>
            <h2>Add New Category</h2>
          </Modal.Header>
          <Modal.Body>
            <form className='text-end' onSubmit={handleSubmitAdd(onSubmit)}>
              <div className="input-group">
                <input {...registerAdd("name", {
                  required: "name is required"
                })} type="text" className='form-control rounded rounded-2' placeholder='Category Name' />
              </div>
              {errorsAdd.name ? <div className='text-danger'>{errorsAdd.name.message}</div> : ""}

              {isLoading
                ? <button className='btn btn-hover bg-main mt-4 text-white'>Saving <i className='fas fa-spin fa-spinner'></i></button>
                : <button type='submit' className='btn btn-hover bg-main mt-4 text-white'>Save</button>}
            </form>
          </Modal.Body>
        </Modal>
      </div>

      {/* Edit modal */}
      <div className="update-model">
        <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
          <Modal.Header closeButton className='border-0'>
            <h2>Edit Category</h2>
          </Modal.Header>
          <Modal.Body>
            <form className='text-end' onSubmit={handleSubmitEdit(onUpdateSubmit)}>
              <div className="input-group">
                <input {...registerEdit("name", {
                  required: "name is required"
                })} type="text" className='form-control rounded rounded-2' placeholder='Category Name' />
              </div>
              {errorsEdit.name ? <div className='text-danger'>{errorsEdit.name.message}</div> : ""}

              {isLoading
                ? <button className='btn btn-hover bg-main mt-4 text-white'>Updating <i className='fas fa-spin fa-spinner'></i></button>
                : <button type='submit' className='btn btn-hover bg-main mt-4 text-white'>Update</button>}
            </form>
          </Modal.Body>
        </Modal>
      </div>

      {/* Delete modal */}
      <div className="delete-model">
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton className='border-0'></Modal.Header>
          <Modal.Body className='text-center p-3'>
            <img src={noData} alt="" />
            <h5 className='pt-2'>Delete This Category ?</h5>
            <p>are you sure you want to delete {item?.name} ? if you are sure just click on delete it</p>
          </Modal.Body>
          <Modal.Footer className='border-0'>
            {isLoading
              ? <Button variant="outline-danger">
                  Deleting <i className='fas fa-spin fa-spinner'></i>
                </Button>
              : <Button variant="outline-danger" onClick={() => deleteItem(item.id)}>
                  Delete this item
                </Button>}
          </Modal.Footer>
        </Modal>
      </div>

      <div className="info-container row p-2  justify-content-between align-items-center ">
        <div className='col-md-8'>
          <h3>Categories Table Details</h3>
          <span>You can check all details</span>
        </div>
       <div className='col-md-4 mt-3'>
         <button  onClick={() => setShowAdd(true)} className='btn btn-add'>Add New Category</button>
       </div>
      </div>

      <div className="table-container px-4 py-3 table-responsive">
        {list ?
          <div>
            <div className="px-4 pt-3 my-3">
              <input
                type="text"
                className="form-control bg-light"
                placeholder="Search by name..."
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <table className="table table-striped table-hover">
              <thead className='table-light'>
                <tr>
                  <th className='p-3' scope="col">Id</th>
                  <th className='p-3' scope="col">Name</th>
                  <th className='p-3' scope="col">Creation Date</th>
                  <th className='p-3' scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((category) => (
                  <tr key={category.id}>
                    <th scope="row">{category.id}</th>
                    <th scope="row">{category.name}</th>
                    <td>{category.creationDate}</td>
                    <ActionCell setShow={setShow} setShowEdit={setShowEdit} setItem={setCategory} item={category} type="categories" />
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