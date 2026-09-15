const fs = require('fs');

console.log("===== FILE CRUD OPERATIONS =====");

// ==================== CREATE ====================

fs.writeFile('example.txt', 'Welcome to Node.js File System!', (err) => {
    if (err) throw err;

    console.log('\n1. CREATE');
    console.log('File created successfully!');

    // ==================== READ ====================

    fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) throw err;

        console.log('\n2. READ');
        console.log('File content:', data);

        // ==================== UPDATE ====================

        fs.writeFile('example.txt', 'This is the updated file content!', (err) => {
            if (err) throw err;

            console.log('\n3. UPDATE');
            console.log('File updated successfully!');

            // ==================== READ UPDATED FILE ====================

            fs.readFile('example.txt', 'utf8', (err, updatedData) => {
                if (err) throw err;

                console.log('Updated content:', updatedData);

                // ==================== APPEND ====================

                fs.appendFile(
                    'example.txt',
                    '\nA new line has been added to the file.',
                    (err) => {
                        if (err) throw err;

                        console.log('\n4. APPEND');
                        console.log('New content added successfully!');

                        // ==================== READ AGAIN ====================

                        fs.readFile('example.txt', 'utf8', (err, finalData) => {
                            if (err) throw err;

                            console.log('Final file content:');
                            console.log(finalData);

                            // ==================== DELETE ====================

                            fs.unlink('example.txt', (err) => {
                                if (err) throw err;

                                console.log('\n5. DELETE');
                                console.log('File deleted successfully!');
                            });
                        });
                    }
                );
            });
        });
    });
});