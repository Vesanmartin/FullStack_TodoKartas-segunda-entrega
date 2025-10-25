import BlogCard from "../components/BlogCard.js"
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Componente BlogCard - Pruebas Front', ()=>{

        // Mocks de blog


        //Prueba 1: Renderizado sin errores
        test("Test 1: Componente renderiza sin errores", () => {
            console.log('BlogCard importado:', BlogCard);

            render(

                <BlogCard
                  titulo="Entrevista a Mins y Boo"
                  descripcion="Secretos del mundo de las cartas con Mins y Boo."
                  img="/assets/images/minscYboo1.webp"
                  enlace="/blog/minsYboo"
                />

            );
        })

        //Prueba 2: Muestra Titulo OK
        test('Test 2: Muestra titulo "Leer  más"',()=>{
            render(<BlogCard />);

            const titulo = screen.getByText(/Leer más/i);
            expect(titulo).toBeInTheDocument();
        });

        //Prueba 3: Estructura Card Correcta
        test('Test 3: Tiene estructura de Card de Bootstrap',()=>{
            const {container} = render(<BlogCard />);
            const card = container.querySelector('.card');    

            expect(card).toBeInTheDocument();
            expect(card).toHaveClass('card mb-3');

        })


});