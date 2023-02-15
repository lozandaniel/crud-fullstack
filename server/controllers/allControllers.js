import { pool } from '../db/mysql.js'

export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM producto");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
}

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query("SELECT * FROM producto where id = ?", [id]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body
    const [rows] = await pool.query("INSERT INTO producto (name, description, price) values (?, ?, ?)", [name, description, price]);
    res.json({ message: 'User created...' });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body
    const { id } = req.params
    const [rows] = await pool.query("UPDATE producto SET name = ?, description = ?, price = ? WHERE id = ?", [name, description, price, id]);
    res.json({ message: 'User updated...', id });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query("DELETE from producto where id = ?", [id]);
    res.json({ message: 'User deleted...', id });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
}