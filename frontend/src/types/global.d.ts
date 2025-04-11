/**
 * Global type declarations for JPX elements and interfaces
 */

declare namespace JPX {
    interface User {
        id: string;
        username: string;
        email: string;
        profileImage?: string;
        role: 'freelancer' | 'client' | 'admin';
        createdAt: Date;
        updatedAt: Date;
    }

    interface Freelancer extends User {
        skills: string[];
        hourlyRate: number;
        availability: 'available' | 'busy' | 'unavailable';
        portfolio: Portfolio[];
        rating: number;
    }

    interface Client extends User {
        company?: string;
        projectsPosted: Project[];
    }

    interface Project {
        id: string;
        title: string;
        description: string;
        budget: number;
        deadline: Date;
        skills: string[];
        clientId: string;
        status: 'open' | 'in-progress' | 'completed' | 'cancelled';
        createdAt: Date;
        updatedAt: Date;
    }

    interface Portfolio {
        id: string;
        title: string;
        description: string;
        imageUrl?: string;
        projectUrl?: string;
        technologies: string[];
    }

    interface Proposal {
        id: string;
        projectId: string;
        freelancerId: string;
        coverLetter: string;
        bidAmount: number;
        estimatedDuration: number;
        status: 'pending' | 'accepted' | 'rejected';
        createdAt: Date;
    }

    interface Review {
        id: string;
        projectId: string;
        fromUserId: string;
        toUserId: string;
        rating: number;
        comment: string;
        createdAt: Date;
    }

    interface Message {
        id: string;
        senderId: string;
        receiverId: string;
        content: string;
        read: boolean;
        createdAt: Date;
    }

    interface Notification {
        id: string;
        userId: string;
        type: 'message' | 'proposal' | 'project' | 'payment' | 'review';
        content: string;
        read: boolean;
        createdAt: Date;
        relatedItemId?: string;
    }

    interface Payment {
        id: string;
        projectId: string;
        clientId: string;
        freelancerId: string;
        amount: number;
        status: 'pending' | 'completed' | 'failed' | 'refunded';
        createdAt: Date;
        transactionId?: string;
    }
}

declare global {
    interface Window {
        JPX: {
            User: JPX.User;
            Freelancer: JPX.Freelancer;
            Client: JPX.Client;
            Project: JPX.Project;
            Portfolio: JPX.Portfolio;
            Proposal: JPX.Proposal;
            Review: JPX.Review;
            Message: JPX.Message;
            Notification: JPX.Notification;
            Payment: JPX.Payment;
        }
    }
}

export {};