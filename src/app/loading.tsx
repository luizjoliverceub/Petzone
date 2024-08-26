import React from 'react'

export default function loading() {
    return (
        <div className="h-screen flex items-center justify-center">
            <span className="animate-spin h-12 w-12 mr-3 rounded-full border-4 border-l-brand-primary" />
        </div>
    )
}