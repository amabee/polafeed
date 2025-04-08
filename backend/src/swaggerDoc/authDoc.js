/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authentication and management
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User signup
 *     description: Creates a new user in the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@email.com"
 *               password:
 *                 type: string
 *                 example: "@Password1234"
 *               firstname:
 *                 type: string
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               gender:
 *                 type: string
 *                 example: "male"
 *               address:
 *                 type: string
 *                 example: "123 Street Name"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1999-12-25"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 123456789012
 *                 username:
 *                   type: string
 *                   example: "john_doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@email.com"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-04-08T11:18:00.547Z"
 * 
 *       409:
 *         description: Duplicate Detail (Existing Data)
 * 
 *       422:
 *         description: Bad Request (Invalid input)
 *
 *       500:
 *         description: Internal Server Error
 */
