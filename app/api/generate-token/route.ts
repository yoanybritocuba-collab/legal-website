import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    const { appointmentId, email } = await request.json();

    // Generar token aleatorio (24 bytes en hex = 48 caracteres)
    const token = randomBytes(24).toString('hex');

    // Guardar token en Firestore (lo haremos desde el cliente)
    // Por ahora solo devolvemos el token

    return NextResponse.json({ 
      success: true, 
      token,
      appointmentId,
      email 
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Error al generar token' 
    }, { status: 500 });
  }
}