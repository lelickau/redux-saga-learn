import React from 'react';
import { useSelector } from 'react-redux';
import { selectPeople } from '../redux/reducers/people/selectors';

const PeopleTable = () => {

    const people = useSelector(selectPeople)
    return (
        <>
            <h1>Star Wars People</h1>
        {
        people.loading
        ? (<div>Loading...</div>)
        : (
            <table border={1} width='100%' cellPadding={2} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Name </th>
                    <th>Birth year </th>
                    <th>Eye color </th>
                    <th>Gender </th>
                    <th>Hair color </th>
                    <th>Height </th>
                </tr>
            </thead>
            <tbody>
                {people?.data?.results.map(character => {
                    return (
                        <tr key={character.created}>
                            <td>{character.name}</td>
                            <td>{character.birth_year}</td>
                            <td>{character.eye_color}</td>
                            <td>{character.gender}</td>
                            <td>{character.hair_color}</td>
                            <td>{character.height}</td>
                        </tr>

                    )
                })}
            </tbody>
            </table>
        )
    }

        </>
    );
};

export default PeopleTable;