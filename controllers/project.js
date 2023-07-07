'use strict'

const Project = require('../models/project');
const fs = require('fs');
const path = require('path');

const controller = {


    home: (req, res) => {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy el método test de mi controlador'
        });
    },

    saveProject: async (req, res) => {
        const project = new Project();

        const params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        // try {
        //     project.save()
        //     .then(projectStored)
        //     // return res.status(200).send({ project: projectStored});
        //     return res.status(200).send({ project: projectStored});
        // } catch (error) {
        //     return res.status(500).send({ message: 'Error al guardar el proyecto' });
        // }

		project.save().then((projectStored) => {
			// if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});

			return res.status(200).send({project: projectStored});
		});
    },

    getProject: async (req, res) => {
        const projectId = req.params.id;
        let project;

        if (projectId == null) {
            return res.status(404).send({ message: 'El proyecto no existe' });
        }

        try {
            project = await Project.findById(projectId);
            return res.status(200).send({ project });
        } catch (error) {
            return res.status(500).send({ message: 'Error al devolver los datos' });
        }
    },

    getProjects: async (req, res) => {
        try {
            // let projects = await Project.find({}).sort('-year').exec();
            let projects = await Project.find({}).exec();
            if (!projects) {
                return res.status(404).send('No hay proyectos para mostrar');
            }
            return res.status(200).send({ projects });
        } catch (error) {
            if (error) {
                return res.status(500).send({ message: 'Error al devolver los datos' });
            }
        }
    },

    updateProject: async (req, res) => {
        const projectId = req.params.id;
        const update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true })
            .then((projectUpdated) => {
                return res.status(200).send({
                    project: projectUpdated
                })
            })
            .catch(() => {
                return res.status(404).send({ message: "Proyecto no encontrado para actualizar." });
            })

    },

    deleteProject: function (req, res) {
        const projectId = req.params.id;

        Project.findByIdAndDelete(projectId)
            .then((projectRemoved) => {
                return res.status(200).send({
                    project: projectRemoved
                })
            })
            .catch((err, projectRemoved) => {
                if (err) return res.status(500).send({ message: 'No se pudo eliminar el proyecto.' });

                if (!projectRemoved) return res.status(404).send({ message: 'No se pudo encontrar el proyecto para ser eliminado.' });
            })
    },

    // uploadImage: (req, res) => {

    //     // if(req.files){
	// 	// 	var filePath = req.files.path;
	// 	// 	var fileSplit = filePath.split('\\');
	// 	// 	var fileName = fileSplit[1];
	// 	// 	var extSplit = fileName.split('\.');
	// 	// 	var fileExt = extSplit[1];

	// 	// 	if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

	// 	// 		Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}).then ((projectUpdated) => {
	// 	// 			// if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

	// 	// 			if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

	// 	// 			return res.status(200).send({
	// 	// 				project: projectUpdated
	// 	// 			});
	// 	// 		});

	// 	// 	}else{
	// 	// 		fs.unlink(filePath, (err) => {
	// 	// 			return res.status(200).send({message: 'La extensión no es válida'});
	// 	// 		});
	// 	// 	}

	// 	// }else{
	// 	// 	return res.status(200).send({
	// 	// 		message: fileName
	// 	// 	});
	// 	// }

    //     // ######################################################################

    //     const filePath = req.file.path;
    //     const fileSplit = filePath.split('\\');
    //     const fileName = fileSplit[1];
    //     const extSplit = fileName.split('\.');
    //     const fileExt = extSplit[1];

    //     console.log(filePath);

    //     if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

    //         if (req.file) {
    //             return res.status(200).send({
    //                 file: req.file
    //             });
    //         } else {
    //             res.status(200).send({
    //                 message: 'No has subido ninguna imagen..'
    //             });
    //         }
            
    //     } else {
    //         fs.unlink(filePath, (err) => {
    //             return res.status(200).send({
    //                 message: 'La extension de la imagen no es válida'
    //             });
    //         });
    //     }
    // }

    uploadImage: (req, res) => {
        if (!req.file) {
          return res.status(400).send({
            message: 'No has subido ninguna imagen.'
          });
        }
      
        const fileExt = path.extname(req.file.filename).toLowerCase().substring(1);
      
        if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif') {
          return res.status(200).send({
            file: req.file
          });
        } else {
          fs.unlink(req.file.path, (err) => {
            return res.status(415).send({
              message: 'La extensión de la imagen no es válida.'
            });
          });
        }
      }
      

}

module.exports = controller;