import { Request, Response } from 'express';
import Contact from '../models/Contact';

// Submit contact form (public endpoint, rate-limited)
export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation is handled by middleware
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      status: 'new',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message,
    });
  }
};

// Get all contact submissions (protected - admin/staff only)
export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query;
    const filter: any = {};
    if (status) {
      filter.status = status;
    }

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message,
    });
  }
};
