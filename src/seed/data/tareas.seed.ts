import { ITareas, Tarea } from "../interface/tareas.interface";
import { v4 as uuid } from 'uuid'

export const TAREAS_SEED: Tarea[] = [
    {
      id_task: uuid(),
      name: "Hacer presentación para reunión",
      description: "Preparar una presentación detallada sobre el informe trimestral para la reunión con el equipo de ventas.",
      date: "2024-04-05",
      date_end: "2024-04-10",
      id_creator: "001"
    },
    {
      id_task: uuid(),
      name: "Investigar nuevos proveedores",
      description: "Investigar y evaluar nuevos proveedores para la adquisición de materiales de oficina.",
      date: "2024-04-06",
      date_end: "2024-04-20",
      id_creator: "002"
    },
    {
      id_task: uuid(),
      name: "Enviar propuestas a clientes",
      description: "Enviar propuestas comerciales a clientes potenciales según la lista proporcionada por el departamento de ventas.",
      date: "2024-04-07",
      date_end: "2024-04-15",
      id_creator: "003"
    },
    {
      id_task: uuid(),
      name: "Actualizar base de datos de clientes",
      description: "Actualizar la base de datos de clientes con la información más reciente obtenida de las interacciones recientes.",
      date: "2024-04-08",
      date_end: "2024-04-12",
      id_creator: "004"
    },
    {
      id_task: uuid(),
      name: "Preparar informe financiero",
      description: "Generar un informe detallado sobre el estado financiero del trimestre actual.",
      date: "2024-04-09",
      date_end: "2024-04-25",
      id_creator: "005"
    },
    {
      id_task: uuid(),
      name: "Organizar evento de team building",
      description: "Planificar y organizar un evento de team building para el equipo de trabajo.",
      date: "2024-04-10",
      date_end: "2024-05-05",
      id_creator: "001"
    },
    {
      id_task: uuid(),
      name: "Revisar contratos con proveedores",
      description: "Revisar los contratos existentes con los proveedores para asegurar que estén actualizados y en cumplimiento.",
      date: "2024-04-11",
      date_end: "2024-04-18",
      id_creator: "002"
    },
    {
      id_task: uuid(),
      name: "Desarrollar nueva estrategia de marketing",
      description: "Colaborar con el equipo de marketing para desarrollar una nueva estrategia de promoción de productos.",
      date: "2024-04-12",
      date_end: "2024-04-30",
      id_creator: "003"
    },
    {
      id_task: uuid(),
      name: "Entrenamiento de nuevos empleados",
      description: "Organizar y llevar a cabo un programa de entrenamiento para los nuevos empleados.",
      date: "2024-04-13",
      date_end: "2024-04-28",
      id_creator: "004"
    },
    {
      id_task: uuid(),
      name: "Actualizar sitio web corporativo",
      description: "Realizar actualizaciones y mejoras en el sitio web corporativo para mejorar la experiencia del usuario.",
      date: "2024-04-14",
      date_end: "2024-05-10",
      id_creator: "005"
    },
    {
      id_task: uuid(),
      name: "Evaluar rendimiento del personal",
      description: "Realizar evaluaciones de desempeño para identificar áreas de mejora y reconocer logros.",
      date: "2024-04-15",
      date_end: "2024-04-22",
      id_creator: "001"
    },
    {
      id_task: uuid(),
      name: "Preparar informe de ventas",
      description: "Recopilar datos de ventas y generar un informe detallado para la gerencia.",
      date: "2024-04-16",
      date_end: "2024-04-24",
      id_creator: "002"
    },
    {
      id_task: uuid(),
      name: "Organizar reunión de seguimiento",
      description: "Programar y organizar una reunión de seguimiento con el equipo para discutir el progreso de los proyectos.",
      date: "2024-04-17",
      date_end: "2024-04-20",
      id_creator: "003"
    },
    {
      id_task: uuid(),
      name: "Investigar nuevas oportunidades de negocio",
      description: "Realizar investigación de mercado para identificar nuevas oportunidades de negocio.",
      date: "2024-04-18",
      date_end: "2024-05-01",
      id_creator: "004"
    },
    {
      id_task: uuid(),
      name: "Elaborar plan de contingencia",
      description: "Desarrollar un plan de contingencia para hacer frente a posibles situaciones de crisis.",
      date: "2024-04-19",
      date_end: "2024-04-30",
      id_creator: "005"
    }
  ]