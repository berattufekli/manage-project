const asyncErrorWrapper = require("express-async-handler");

const db = require("../models/application");
const fs = require("fs-extra");

class Controller {
  constructor(model) {
    this.model = model;
  }

  getAll = asyncErrorWrapper(async (req, res) => {
    try {
      switch (this.model) {
        case db.songs:
          let data = await this.model.findAll({
            include: [
              {
                model: db.songCategories,
                as: "songCategoryData",
              },
              {
                model: db.composers,
                as: "composerInfo",
              },
            ],
          });
          return res.status(200).json({
            success: true,
            data: data,
          });
          break;
        case db.songLists:
          let datasongLists = await this.model.findAll({
            where: {
              status: "active",
            },
            include: [
              {
                model: db.songs,
                as: "songInfo",
                include: [
                  {
                    model: db.songCategories,
                    as: "songCategoryData",
                  },
                ],
              },
              {
                model: db.musicians,
                as: "songMusicianInfo",
              },
              {
                model: db.instruments,
                as: "songInstrumentInfo",
              },
              {
                model: db.songDetails,
                as: "songDetails",
              },
            ],
          });

          console.log(datasongLists);
          return res.status(200).json({
            success: true,
            data: datasongLists,
          });
          break;
        case db.userFavorites:
          console.log("BURAYAA GİRDDİİİİ");
          let dataFavoritesSong = await this.model.findAll({
            include: [
              {
                model: db.users,
                as: "userInfo",
              },
              {
                model: db.songLists,
                as: "songInfo",
              },
            ],
          });
          return res.status(200).json({
            success: true,
            data: dataFavoritesSong,
          });
          break;
        case db.lessons:
          let dataLessons = await this.model.findAll({
            include: [
              {
                model: db.instruments,
                as: "lessonInstrumentInfo",
              },
              {
                model: db.musicians,
                as: "lessonMusicianInfo",
              },
              {
                model: db.lessonDetails,
                as: "lessonDetails",
              }
            ],
          });
          return res.status(200).json({
            success: true,
            data: dataLessons,
          });
        case db.courses:
          let dataCourses = await this.model.findAll({
            include: [
              {
                model: db.courseCategories,
                as: "courseCategoryData",
              },
              {
                model: db.courseLessons,
                as: "courseLessonData",
              },
            ],
          });
          return res.status(200).json({
            success: true,
            data: dataCourses,
          });

        case db.instructerCourses:
          let dataInstructerCourses = await this.model.findAll({
            include: [
              {
                model: db.instruments,
                as: "courseInstrumentInfo",
              },
              {
                model: db.instructers,
                as: "courseInstructerInfo",
              },
              {
                model: db.instructerLessons,
                as: "instructerCourseLessons",
              },
            ],
          });
          return res.status(200).json({
            success: true,
            data: dataInstructerCourses,
          });
        case db.instructerLessons:
          let instructerLessonsData = await this.model.findAll({
            include: [
              {
                model: db.instructerCourses,
                as: "instructerLessonCourseInfo",
                include: [
                  {
                    model: db.instruments,
                    as: "courseInstrumentInfo",
                  },
                  {
                    model: db.instructers,
                    as: "courseInstructerInfo",
                  },
                ],
              },
            ],
          });
          return res.status(200).json({
            success: true,
            data: instructerLessonsData,
          });
        default:
          break;
      }

      let data = await this.model.findAll();

      if (data.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No data found.",
        });
      }
      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(200).json({
        success: false,
        data: [],
      });
    }
  });

  create = asyncErrorWrapper(async (req, res) => {
    try {
      let dataToSend = await this.model.create(req.body);

      return res.status(200).json({
        success: true,
        message: "Data created.",
        data: dataToSend,
      });
    } catch (error) {
      console.log("geldin mi", error);
      console.log("error", error);
      console.log("error", error);
      return res.status(200).json({
        success: false,
        data: {},
      });
    }
  });

  createWithUrl = asyncErrorWrapper(async (req, res) => {
    try {
      const fileName = req.fileName;

      const image = req.file;
      const photoUrlNew =
        image && image.originalname && fileName ? fileName : "";
      let url = photoUrlNew;
      console.log("re.bod", req.body);

      const dataToSend = await this.model.create({ ...req.body, url });

      switch (this.model) {
        case db.subscriptions:
          let dataSubscription = await db.subscriptions.findOne({
            where: {
              subscriptionId: dataToSend.subscriptionId,
            },
          });

          try {
            const trialInfoResponse = await db.trialInfos.create({
              ...req.body,
              status: "active",
            });
            console.log(trialInfoResponse);
          } catch (error) {
            console.log(error);
          }

          return res.status(200).json({
            success: true,
            data: dataSubscription,
          });
        case db.lessons:
          await db.lessonDetails.create({ ...req.body, lessonId: dataToSend.lessonId });

          let dataLesson = await db.lessons.findOne({
            where: {
              lessonId: dataToSend.lessonId,
            },
            include: [
              {
                model: db.musicians,
                as: "lessonMusicianInfo",
              },
              {
                model: db.instruments,
                as: "lessonInstrumentInfo",
              },
            ],
          });
          return res.status(200).json({
            success: true,
            data: dataLesson,
          });
        case db.songs:
          console.log("xxx", this.model);
          try {
            let songCategoryData = req.body.songCategoryData;
            if (songCategoryData) {
              songCategoryData = JSON.parse(songCategoryData);
            }
            console.log("songCategoryData", songCategoryData);
            let songCategories = [];
            songCategoryData &&
              songCategoryData.length > 0 &&
              songCategoryData.map((c) => {
                let row = { ...c, songId: dataToSend.songId };
                console.log(row);
                songCategories.push(row);
              });
            if (songCategories && songCategories.length > 0) {
              let songCategoriesData = await db.songCategories.bulkCreate(
                songCategories
              );
              const dataWithCategory = await db.songs.findOne({
                where: {
                  songId: dataToSend.songId,
                },
                include: [
                  {
                    model: db.songCategories,
                    as: "songCategoryData",
                  },
                  {
                    model: db.composers,
                    as: "composerInfo",
                  },
                ],
              });
              console.log(
                "dataWithCategory Başarılı şekilde eklendi",
                dataWithCategory
              );

              return res.status(200).json({
                success: true,
                message: "Data created.",
                data: dataWithCategory,
              });
            }
          } catch (error) {
            console.log("error", error);
          }
          break;
        case db.courses:
          try {
            let courseCategories = req.body.courseCategoriesData;
            let courseLessons = req.body.courseLessonsData;

            if (courseCategories && courseLessons) {
              courseCategories = JSON.parse(courseCategories);
              courseLessons = JSON.parse(courseLessons);
            }

            let courseCategoriesList = [];
            courseCategories &&
              courseCategories.length > 0 &&
              courseCategories.map((c) => {
                let row = { ...c, courseId: dataToSend.courseId };
                courseCategoriesList.push(row);
              });

            let courseLessonsList = [];
            courseLessons &&
              courseLessons.length > 0 &&
              courseLessons.map((c) => {
                let row = { ...c, courseId: dataToSend.courseId };
                courseLessonsList.push(row);
              });

            if (courseCategoriesList.length > 0) {
              let courseCategoriesData = await db.courseCategories.bulkCreate(
                courseCategoriesList
              );

              let courseLessonsData = await db.courseLessons.bulkCreate(
                courseLessonsList
              );

              const dataWithCourseCategoriesAndLessons = await db.courses.findOne(
                {
                  where: {
                    courseId: dataToSend.courseId,
                  },
                  include: [
                    {
                      model: db.courseCategories,
                      as: "courseCategoryData",
                    },
                    {
                      model: db.courseLessons,
                      as: "courseLessonData",
                    },
                  ],
                }
              );
              console.log(
                "dataWithCourseCategoriesAndLessons",
                dataWithCourseCategoriesAndLessons
              );

              return res.status(200).json({
                success: true,
                message: "Data created.",
                data: dataWithCourseCategoriesAndLessons,
              });
            }
          } catch (error) {
            console.log("error", error);
          }

        case db.instructerCourses:
          try {
            const dataWithCourse = await db.instructerCourses.findOne({
              where: {
                courseId: dataToSend.courseId,
              },
              include: [
                {
                  model: db.instrumentId,
                  as: "courseInstrumentInfo",
                },
                {
                  model: db.instructerId,
                  as: "courseInstructerInfo",
                },
                {
                  model: db.courseId,
                  as: "instructerCourseLessons",
                },
              ],
            });

            return res.status(200).json({
              success: true,
              message: "Data created.",
              data: dataWithCourse,
            });
          } catch (error) {
            console.log("error", error);
          }
          break;

        case db.songLists:
          const {
            videoStart,
            videoMain,
            videoEnd,
            videoUrl,
            noteStart,
            noteMain,
            noteEnd,
            noteTolerance,
            noteHeight,
            noteWidth,
            bpm,
            duration,
          } = req.body;

          let songDetailsData = {
            detailId: dataToSend.listId,
            songId: dataToSend.songId,
            listId: dataToSend.listId,
            videoStart,
            videoMain,
            videoEnd,
            videoUrl,
            noteStart,
            noteMain,
            noteEnd,
            noteTolerance,
            noteHeight,
            noteWidth,
            bpm,
            duration,
            status: "active",
          };

          const songDetailsResponse = await db.songDetails.create(
            songDetailsData
          );

          let datasongLists = await this.model.findOne({
            where: {
              listId: dataToSend.listId,
            },
            include: [
              {
                model: db.songs,
                as: "songInfo",
              },
              {
                model: db.musicians,
                as: "songMusicianInfo",
              },
              {
                model: db.instruments,
                as: "songInstrumentInfo",
              },
              {
                model: db.songDetails,
                as: "songDetails",
              },
            ],
          });
          return res.status(200).json({
            success: true,
            data: datasongLists,
          });
        default:
          break;
      }

      return res.status(200).json({
        success: true,
        message: "Data created.",
        data: dataToSend,
      });
    } catch (error) {
      console.log("geldin mi", error);
      console.log("error", error);
      console.log("error", error);
      return res.status(200).json({
        success: false,
        data: [],
      });
    }
  });

  createWithVideo = asyncErrorWrapper(async (req, res) => {
    try {
      const images = req.files;
      console.log("images", images);
      const image1 = images["url"] ? images["url"][0] : "";
      const image2 = images["songUrl"] ? images["songUrl"][0] : "";

      const photoUrlNew = image1 && image1.originalname ? image1.filename : "";
      let url = photoUrlNew;

      const songUrlNew = image2 && image2.originalname ? image2.filename : "";
      let songUrl = songUrlNew;

      const dataToSend = await this.model.create({ ...req.body, url, songUrl });

      switch (this.model) {
        default:
          break;
      }

      return res.status(200).json({
        success: true,
        message: "Data created.",
        data: dataToSend,
      });
    } catch (error) {
      console.log("geldin mi", error);
      console.log("error", error);
    }
  });
  createOrUpdate = asyncErrorWrapper(async (req, res) => {
    try {
      let data = req.data;
      if (data) {
        await data.update(req.body);
      } else {
        data = await this.model.create(req.body);
      }
      return res.status(200).json({
        success: true,
        message: "Data created.",
        data,
      });
    } catch (error) {
      console.log("error", error);
    }
  });
  getById = asyncErrorWrapper(async (req, res) => {
    try {
      const data = req.data;

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log("error", error);
    }
  });

  update = asyncErrorWrapper(async (req, res) => {
    const data = req.data;
    await data.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Updating is successful.",
      data,
    });
  });

  updateWithUrl = asyncErrorWrapper(async (req, res) => {
    try {
      const data = req.data;

      console.log("bak123", data);
      let { url } = data;

      console.log("url", url);
      const image = req.file;
      const fileName = req.fileName;
      console.log("image", image);
      const photoUrlNew =
        image && image.originalname && fileName ? fileName : "";

      if (image && photoUrlNew) {
        console.log("buraya girdik mi acaba");

        if (url) {
          const dir = `./uploads/${url}`;
          if (dir && dir.length > 0 && url && url.length > 0) {
            fs.unlink(dir, (err) => console.log("error", err));
          }
        }
        console.log(req.body);
        await data.update({ ...req.body, url: photoUrlNew });
      } else {
        console.log("buraya girdik");
        await data.update(req.body);
      }

      switch (this.model) {
        case db.songs:
          console.log("xxx", this.model);
          try {
            let songCategoryData = req.body.songCategoryData;
            if (songCategoryData) {
              songCategoryData = JSON.parse(songCategoryData);
            }
            console.log("songCategoryData", songCategoryData);
            let songCategories = [];
            songCategoryData &&
              songCategoryData.length > 0 &&
              songCategoryData.map((c) => {
                let row = { ...c, songId: data.songId };
                console.log(row);
                songCategories.push(row);
              });

            await db.songCategories.destroy({
              where: {
                songId: data.songId,
              },
            });

            if (songCategories && songCategories.length > 0) {
              let songCategoriesData = await db.songCategories.bulkCreate(
                songCategories
              );
              const dataWithCategory = await db.songs.findOne({
                where: {
                  songId: data.songId,
                },
                include: [
                  {
                    model: db.songCategories,
                    as: "songCategoryData",
                  },
                ],
              });
              console.log("dataWithCategory", dataWithCategory);
              return res.status(200).json({
                success: true,
                message: "Updating is successful.",
                data: dataWithCategory,
              });
            }
          } catch (error) {
            console.log("error", error);
          }
          break;
        case db.courses:
          try {
            let courseCategories = req.body.courseCategoriesData;
            let courseLessons = req.body.courseLessonsData;

            console.log("CC, CL", courseCategories, courseLessons);
            if (courseCategories && courseLessons) {
              courseCategories = JSON.parse(courseCategories);
              courseLessons = JSON.parse(courseLessons);
            }

            let courseCategoriesList = [];
            courseCategories &&
              courseCategories.length > 0 &&
              courseCategories.map((c) => {
                let row = { ...c, courseId: data.courseId };
                courseCategoriesList.push(row);
              });

            let courseLessonsList = [];
            courseLessons &&
              courseLessons.length > 0 &&
              courseLessons.map((c) => {
                let row = { ...c, courseId: data.courseId };
                courseLessonsList.push(row);
              });

            await db.courseCategories.destroy({
              where: {
                courseId: data.courseId,
              },
            });

            await db.courseLessons.destroy({
              where: {
                courseId: data.courseId,
              },
            });

            if (
              courseCategoriesList &&
              courseCategoriesList.length > 0 &&
              courseLessons &&
              courseLessons.length > 0
            ) {
              let courseCategoriesData = await db.courseCategories.bulkCreate(
                courseCategoriesList
              );

              let courseLessonsData = await db.courseLessons.bulkCreate(
                courseLessonsList
              );

              const dataWithCourseCategoriesAndLessons = await db.courses.findOne(
                {
                  where: {
                    courseId: data.courseId,
                  },
                  include: [
                    {
                      model: db.courseCategories,
                      as: "courseCategoryData",
                    },
                    {
                      model: db.courseLessons,
                      as: "courseLessonData",
                    },
                  ],
                }
              );
              console.log(
                "dataWithCourseCategoriesAndLessons",
                dataWithCourseCategoriesAndLessons
              );

              return res.status(200).json({
                success: true,
                message: "Updating is succesfull.",
                data: dataWithCourseCategoriesAndLessons,
              });
            }
          } catch (error) {
            console.log("error", error);
          }
          break;
        case db.songLists:
          console.log("buraya girdikkkkk");
          try {
            console.log("Song Liste Girdi updateWithUrl kanckjasncjkancs");

            console.log(req.body);
            const {
              videoStart,
              videoMain,
              videoEnd,
              videoUrl,
              noteStart,
              noteMain,
              noteEnd,
              noteTolerance,
              noteHeight,
              noteWidth,
              bpm,
              duration,
            } = req.body;

            let songDetailsData = {
              detailId: data.listId,
              songId: data.songId,
              listId: data.listId,
              videoStart,
              videoMain,
              videoEnd,
              videoUrl,
              noteStart,
              noteMain,
              noteEnd,
              noteTolerance,
              noteHeight,
              noteWidth,
              bpm,
              duration,
              status: "active",
            };

            console.log("SONG DETAİLS", songDetailsData);

            await db.songDetails.destroy({
              where: {
                listId: data.listId,
              },
            });

            const songDetailsResponse = await db.songDetails.create(
              songDetailsData
            );

            let datasongLists = await this.model.findOne({
              where: {
                listId: data.listId,
              },
              include: [
                {
                  model: db.songs,
                  as: "songInfo",
                },
                {
                  model: db.musicians,
                  as: "songMusicianInfo",
                },
                {
                  model: db.instruments,
                  as: "songInstrumentInfo",
                },
                {
                  model: db.songDetails,
                  as: "songDetails",
                },
              ],
            });
            return res.status(200).json({
              success: true,
              data: datasongLists,
            });
          } catch (error) {
            console.log("error", error);
          }
          break;
        case db.lessons:
          try {

            const { isHaveNote, lessonDetailId } = req.body;

            if (isHaveNote === "true") {
              const lessonDetail = await db.lessonDetails.findOne({
                where: {
                  lessonDetailId
                },
              });

              if (lessonDetail) {
                await lessonDetail.update({ ...req.body });
              }
              else {
                await db.lessonDetails.create({ ...req.body, lessonId: data.lessonId, lessonDetailId: 0 });
              }

            }
            else {
              await db.lessonDetails.destroy({
                where: {
                  lessonDetailId: req.body.lessonDetailId,
                },
              });
            }


            let dataLesson = await db.lessons.findOne({
              where: {
                lessonId: data.lessonId,
              },
              include: [
                {
                  model: db.musicians,
                  as: "lessonMusicianInfo",
                },
                {
                  model: db.instruments,
                  as: "lessonInstrumentInfo",
                },
                {
                  model: db.lessonDetails,
                  as: "lessonDetails",
                }
              ],
            });
            return res.status(200).json({
              success: true,
              data: dataLesson,
            });
          } catch (error) {
            console.log("error", error);
          }
          break;

        case db.subscriptions:
          console.log("BURAYA GİRDİK BACKEND");
        case db.feedbacks:
          const { userName } = data;
          
          let dataFeedback = await db.feedbacks.findOne({
            where: {
              feedbackId: data.feedbackId,
            },
          });

          return res.status(200).json({
            success: true,
            data: dataFeedback,
          });

        case db.instructerLessons:
          let instructerLessonsData = await this.model.findAll({
            include: [
              {
                model: db.instructerCourses,
                as: "instructerLessonCourseInfo",
                include: [
                  {
                    model: db.instruments,
                    as: "courseInstrumentInfo",
                  },
                  {
                    model: db.instructers,
                    as: "courseInstructerInfo",
                  },
                ],
              },
            ],
          });
          return res.status(200).json({
            success: true,
            data: instructerLessonsData,
          });
        default:
          console.log("dataaa", data);
          return res.status(200).json({
            success: true,
            message: "Updating is successful.",
            data: data,
          });
          break;
      }

    } catch (error) {
      console.log("errr", error);
    }
  });

  updateWithVideo = asyncErrorWrapper(async (req, res) => {
    try {
      const data = req.data;
      let { url, songUrl } = data;
      const images = req.files;
      const image1 = images["url"] ? images["url"][0] : "";
      const image2 = images["songUrl"] ? images["songUrl"][0] : "";
      const photoUrlNew =
        image1 && image1.originalname && image1.filename ? image1.filename : "";
      const songUrlNew =
        image2 && image2.originalname && image2.filename ? image2.filename : "";
      let dataToUpdate = { ...req.body };

      console.log("fileName", req.fileName, "files", req.files);
      console.log("pt", photoUrlNew);
      console.log("video", songUrlNew, songUrl);

      console.log("img1, img2", image1, image2);

      try {
        if (image1 && photoUrlNew) {
          console.log("photoUrlNew girdi");

          if (url) {
            const dir = `./uploads/${url}`;
            if (dir && dir.length > 0 && url && url.length > 0) {
              fs.unlink(dir, (err) => console.log("error", err));
            }
          }
          dataToUpdate = { ...dataToUpdate, url: photoUrlNew };
        }
        if (image2 && songUrlNew) {
          console.log("songUrlNew girdi");
          if (songUrl) {
            const dir = `./uploads/${songUrl}`;
            if (dir && dir.length > 0 && songUrl && songUrl.length > 0) {
              fs.unlink(dir, (err) => console.log("error", err));
            }
          }
          dataToUpdate = { ...dataToUpdate, songUrl: songUrlNew };
        }

        console.log(dataToUpdate);

        await data.update(dataToUpdate);
      } catch (error) {
        console.log("BJK ERROR", error);
      }

      switch (this.model) {
        case db.songLists:
          console.log("buraya girdikkkkk");
          try {
            console.log("Song Liste Girdi updateWithUrl kanckjasncjkancs");

            console.log(req.body);
            const {
              videoStart,
              videoMain,
              videoEnd,
              videoUrl,
              noteStart,
              noteMain,
              noteEnd,
              noteTolerance,
              noteHeight,
              noteWidth,
              bpm,
            } = req.body;

            let songDetailsData = {
              detailId: data.listId,
              songId: data.songId,
              listId: data.listId,
              videoStart,
              videoMain,
              videoEnd,
              videoUrl: songUrlNew,
              noteStart,
              noteMain,
              noteEnd,
              noteTolerance,
              noteHeight,
              noteWidth,
              bpm,
              status: "active",
            };

            console.log("SONG DETAİLS", songDetailsData);

            await db.songDetails.destroy({
              where: {
                listId: data.listId,
              },
            });

            const songDetailsResponse = await db.songDetails.create(
              songDetailsData
            );

            let datasongLists = await this.model.findOne({
              where: {
                listId: data.listId,
              },
              include: [
                {
                  model: db.songs,
                  as: "songInfo",
                },
                {
                  model: db.musicians,
                  as: "songMusicianInfo",
                },
                {
                  model: db.instruments,
                  as: "songInstrumentInfo",
                },
                {
                  model: db.songDetails,
                  as: "songDetails",
                },
              ],
            });
            return res.status(200).json({
              success: true,
              data: datasongLists,
            });
          } catch (error) {
            console.log("error", error);
          }
          break;
        case db.instructerLessons:
          let instructerLessonsData = await this.model.findAll({
            include: [
              {
                model: db.instructerCourses,
                as: "instructerLessonCourseInfo",
                include: [
                  {
                    model: db.instruments,
                    as: "courseInstrumentInfo",
                  },
                  {
                    model: db.instructers,
                    as: "courseInstructerInfo",
                  },
                ],
              },
            ],
          });
          return res.status(200).json({
            success: true,
            data: instructerLessonsData,
          });
        default:
          break;
      }
      console.log("dataaa", data);
      return res.status(200).json({
        success: true,
        message: "Updating is successful.",
        data: data,
      });
    } catch (error) {
      console.log("errr", error);
    }
  });
  delete = asyncErrorWrapper(async (req, res) => {
    const data = req.data;
    await data.destroy();

    res.status(200).json({
      success: true,
      message: "Data deleted.",
    });
  });

  getDataByQuery = asyncErrorWrapper(async (req, res) => {
    const query = req.query || {};

    switch (this.model) {
      case db.userFavorites:
        let dataFavoritesSong = await this.model.findAll({
          where: query,
          include: [
            {
              model: db.users,
              as: "userInfo",
            },
            {
              model: db.songLists,
              as: "songInfo",
              include: [
                {
                  model: db.songs,
                  as: "songInfo",
                },
              ],
            },
          ],
        });

        console.log(dataFavoritesSong);
        return res.status(200).json({
          success: true,
          data: dataFavoritesSong,
        });
        break;

      case db.instructerCourses:
        let instructorCourses = await this.model.findAll({
          where: query,
          include: [
            {
              model: db.instruments,
              as: "courseInstrumentInfo",
            },
            {
              model: db.instructers,
              as: "courseInstructerInfo",
            },
            {
              model: db.instructerLessons,
              as: "instructerCourseLessons",
            },
          ],
        });
        return res.status(200).json({
          success: true,
          data: instructorCourses,
        });
        break;
      case db.feedbacks:
        let feedbackData = await this.model.findAll({
          where: query,
        });

        console.log(feedbackData);
        return res.status(200).json({
          success: true,
          data: feedbackData,
        });
        break;
      case db.songs:
        console.log(query);
        try {
          let dataSongs = await this.model.findAll({
            where: query,
          });
          console.log(dataSongs);
          return res.status(200).json({
            success: true,
            data: dataSongs,
          });
        } catch (error) {
          console.log(error);
        }
        break;
      case db.subscriptions:
        let expiredSubscriptions = await this.model.findAll({
          where: query,
        });

        console.log(expiredSubscriptions);
        return res.status(200).json({
          success: true,
          data: expiredSubscriptions,
        });
        break;
      case db.songLists:
        let datasongLists = await this.model.findAll({
          where: {
            status: "active"
          },
          include: [
            {
              model: db.songs,
              as: "songInfo",
              where: {
                isTrial: true,

              },
              include: [
                {
                  model: db.songCategories,
                  as: "songCategoryData",
                },
              ],
            },
            {
              model: db.musicians,
              as: "songMusicianInfo",
            },
            {
              model: db.instruments,
              as: "songInstrumentInfo",
            },
            {
              model: db.songDetails,
              as: "songDetails",
            },
          ],
        });

        console.log(datasongLists);
        return res.status(200).json({
          success: true,
          data: datasongLists,
        });
        break;
    }
  });
}

module.exports = Controller;
