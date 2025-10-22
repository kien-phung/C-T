import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { Contact } from "../models/contact.model.js";

/**
 * Get all contacts (Admin only)
 */
export const getAllContacts = RequestHandlerCustom(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Get filters from query
    const filter: any = {};
    if (req.query.submit_type) {
        filter.submit_type = req.query.submit_type;
    }
    if (req.query.search) {
        filter.$or = [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
            { phone: { $regex: req.query.search, $options: 'i' } }
        ];
    }

    // Get total count
    const total = await Contact.countDocuments(filter);

    // Get contacts with pagination
    const contacts = await Contact.find(filter)
        .sort({ createdAt: -1 }) // Newest first
        .skip(skip)
        .limit(limit);

    res.status(200).json({
        success: true,
        data: {
            contacts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    });
});

/**
 * Get single contact by ID
 */
export const getContactById = RequestHandlerCustom(async (req, res) => {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
        return res.status(404).json({
            success: false,
            message: "Không tìm thấy liên hệ"
        });
    }

    res.status(200).json({
        success: true,
        data: { contact }
    });
});

/**
 * Delete contact by ID
 */
export const deleteContact = RequestHandlerCustom(async (req, res) => {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
        return res.status(404).json({
            success: false,
            message: "Không tìm thấy liên hệ"
        });
    }

    res.status(200).json({
        success: true,
        message: "Đã xóa liên hệ thành công"
    });
});

/**
 * Get contacts statistics
 */
export const getContactsStats = RequestHandlerCustom(async (req, res) => {
    const total = await Contact.countDocuments();

    // Group by submit_type
    const byType = await Contact.aggregate([
        {
            $group: {
                _id: '$submit_type',
                count: { $sum: 1 }
            }
        }
    ]);

    // Get recent contacts (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentCount = await Contact.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
    });

    res.status(200).json({
        success: true,
        data: {
            total,
            byType,
            recentCount
        }
    });
});
