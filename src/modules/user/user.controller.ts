import { Request, Response } from 'express';

import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  // const { name, email,password } = req.body;

  try {
    const result = await userServices.createUser(req.body);
    // console.log(result.rows[0]);
    // res.send({ message: 'Data inserted ' });
    res.status(201).json({
      success: false,
      message: 'Data Inserted successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  // res.send({ message: 'Api is cool' });

  try {
    const result = await userServices.getSingleUser(req.params.id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched Successfully',
        data: result.rows[0],
      });
    }

    console.log(result.rows);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await userServices.updateUser(name, email, req.params.id!);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User updated Successfully',
        data: result.rows[0],
      });
    }

    // console.log(result.rows);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  // res.send({ message: 'Api is cool' });

  try {
    const result = await userServices.deleteUser(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User deleted Successfully',
        data: result.rows,
      });
    }

    // console.log(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
