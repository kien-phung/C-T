import { RequestHandlerCustom } from '../utils/configs/custom.js';
import { parseRequestData } from '../utils/configs/helper.js';
import { Customer } from '../models/customer.model.js';
import { getIO } from '../utils/libs/socket.js';

/**
 * List customers (admin)
 */
export const listAdminCustomers = RequestHandlerCustom(async (req, res) => {
  const { page = 1, limit = 20, search = '' } = req.query as any;
  const skip = (Number(page) - 1) * Number(limit);

  const searchFilter = search
    ? {
        $or: [
          { name: { $regex: String(search), $options: 'i' } },
          { website_url: { $regex: String(search), $options: 'i' } },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    Customer.find(searchFilter).sort({ display_order: 1, createdAt: -1 }).skip(skip).limit(Number(limit)),
    Customer.countDocuments(searchFilter),
  ]);

  res.status(200).json({ success: true, data: items, meta: { page: Number(page), limit: Number(limit), total } });
});

/** Get single customer (admin) */
export const getAdminCustomerById = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  const item = await Customer.findById(id);
  res.status(200).json({ success: true, data: item });
});

/** Create customer (admin) */
export const createAdminCustomer = RequestHandlerCustom(async (req, res) => {
  const data = parseRequestData(req);
  const item = await Customer.create({
    name: data.name,
    logo: data.logo,
    website_url: data.website_url,
    display_order: typeof data.display_order !== 'undefined' ? Number(data.display_order) : undefined,
  });
  res.status(201).json({ success: true, data: item });
  try { getIO().emit('customers.changed', { type: 'created', data: item }); } catch {}
});

/** Update customer (admin) */
export const updateAdminCustomer = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  const data = parseRequestData(req);
  const item = await Customer.findByIdAndUpdate(
    id,
    {
      $set: {
        name: data.name,
        logo: data.logo,
        website_url: data.website_url,
        display_order: typeof data.display_order !== 'undefined' ? Number(data.display_order) : undefined,
      },
    },
    { new: true }
  );
  res.status(200).json({ success: true, data: item });
  try { getIO().emit('customers.changed', { type: 'updated', data: item }); } catch {}
});

/** Delete customer (admin) */
export const deleteAdminCustomer = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  await Customer.findByIdAndDelete(id);
  res.status(200).json({ success: true, id });
  try { getIO().emit('customers.changed', { type: 'deleted', id }); } catch {}
});