import React, { useState } from 'react';
import axios from 'axios';
import './mensaje.css'; // Importa el archivo CSS

export default function Mensaje() {
    const [localNumber, setLocalNumber] = useState('');
    const [name, setName] = useState('');
    const [appointmentType, setAppointmentType] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const tiposDeCitas = [
        "Odontológica",
        "Medicina general",
        "Rayos X",
        "Laboratorio",
        "Oftalmología",
        "Pediatría",
        "Ginecología",
        "Dermatología",
        "Traumatología",
        "Cardiología"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const fullNumber = `+57${localNumber.replace(/^\+57/, '')}`;

        try {
            const response = await axios.post('https://recordatorio-back.onrender.com/api/messages/send', {
                to: fullNumber,
                name,
                appointmentType
            });
            setMessage(`Mensaje enviado! SID: ${response.data.sid}`);
            setLocalNumber('');
            setName('');
            setAppointmentType('');
        } catch (err) {
            setError(err.response?.data.error || 'Error al enviar el mensaje.');
        }
    };

    return (
        <div className="container">
            
            <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                    <label className="label">Teléfono:</label>
                    <input 
                        type="tel" 
                        value={localNumber} 
                        onChange={(e) => setLocalNumber(e.target.value)} 
                        required 
                        placeholder="300 123 4567"
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label className="label">Nombre:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label className="label">Tipo de Cita:</label>
                    <select 
                        value={appointmentType} 
                        onChange={(e) => setAppointmentType(e.target.value)} 
                        required
                        className="select"
                    >
                        <option value="">Seleccione un tipo de cita</option>
                        {tiposDeCitas.map((tipo, index) => (
                            <option key={index} value={tipo}>{tipo}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="button">Enviar Mensaje</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}
