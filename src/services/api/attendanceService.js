class AttendanceService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'attendance_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "employee_id_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "clock_in_c" } },
          { field: { Name: "clock_out_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching attendance:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "employee_id_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "clock_in_c" } },
          { field: { Name: "clock_out_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching attendance with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching attendance with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  }

  async create(attendanceData) {
    try {
      const params = {
        records: [{
          Name: attendanceData.Name || `Attendance ${attendanceData.date_c}`,
          employee_id_c: parseInt(attendanceData.employee_id_c),
          date_c: attendanceData.date_c,
          clock_in_c: attendanceData.clock_in_c,
          clock_out_c: attendanceData.clock_out_c,
          status_c: attendanceData.status_c,
          Tags: attendanceData.Tags || "",
          Owner: attendanceData.Owner
        }]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || "Failed to create attendance record");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating attendance:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating attendance:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async update(id, attendanceData) {
    try {
      const params = {
        records: [{
          Id: id,
          Name: attendanceData.Name || `Attendance ${attendanceData.date_c}`,
          employee_id_c: parseInt(attendanceData.employee_id_c),
          date_c: attendanceData.date_c,
          clock_in_c: attendanceData.clock_in_c,
          clock_out_c: attendanceData.clock_out_c,
          status_c: attendanceData.status_c,
          Tags: attendanceData.Tags,
          Owner: attendanceData.Owner
        }]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0].message || "Failed to update attendance record");
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating attendance:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating attendance:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error(failedDeletions[0].message || "Failed to delete attendance record");
        }
        
        return { success: true };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting attendance:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting attendance:", error.message);
        throw new Error(error.message);
      }
    }
  }
}

export const attendanceService = new AttendanceService();