import React from 'react';

function Formulario() {
    return (
        <form>
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    onChange={handleChange}
                />
            </div>
        </form>
    )
}

export default Formulario;
